let mysql = require('mysql');
const fs = require('fs');
let S = require('string');
const assert = require('assert');
let stringify = require('json-stringify');
const debug = 0;

let detG = "";

class Municipio{

	constructor(n,c,g){
	    this.nome = n;
	    this.cod = c;
	    this.geometria = g;
	}
}


class MapService{
    
    constructor(req, res){
        this.req = req
        this.res = res
    }

    static DetalhamentoGeo(div){
        div.nome = "vi.municipio_cod_municipio";
        if(detG != "municipio"){
            if(detG == "estado"){
                div.nome = "e.cod_estado";
                div.join = " INNER JOIN estado e on e.cod_estado = m.estado_estado ";
            }else{
                div.nome = "mr.cod_mesoRegiao";
                div.join = " INNER JOIN mesoRegiao mr on mr.cod_mesoRegiao = m.mesoRegiao_cod_mesoRegiao ";
            }
        } 
    }



    AplicarIndicador(req, res){
        let self = this;
        let output = [];
        detG = req.query.divisao;

        function Indicador(m,v){
            this.municipio= m;
            this.valor= v;
        };
        

        //FunÃ§Ã£o para transformar o string da formula em um resultado
        function Resolver(eq){  
            return eval(eq).toFixed(2);
        }
        try{
            let output = [];
            let mysql = require('mysql'); 
            //INPUT de detalhamento geográfico e código do Indicador
            
            let codind = req.query.codIndicador;
            let query;
            let con = mysql.createConnection({
              host: "localhost",
              user: "root",
              password: 'ibict2017',
              database: "visao"
            });

            

            con.connect(function(err) {
              if (err) throw err;
                let div = {nome:'', join: ''};                
                
                MapService.DetalhamentoGeo(div);

                query = 'SELECT ordem,antecessor, uni.nome,  '+div.nome+' as divisao, sum(vi.valor) as valor FROM indicador_informacao ii '+
                        'INNER JOIN indicador i ON i.cod_indicador = ii.indicador_cod_indicador INNER JOIN unidade uni ON i.unidade_cod_unidade = uni.cod_unidade '+
                        'INNER JOIN informacao info ON info.cod_informacao = ii.informacao_cod_informacao INNER JOIN valor_informacao vi ON vi.informacao_cod_informacao = info.cod_informacao '+
                        'INNER JOIN municipio m ON vi.municipio_cod_municipio = m.cod_municipio '+ div.join +
                        ' where i.cod_indicador = '+codind+' GROUP BY ordem, antecessor, divisao ORDER BY '+div.nome+ ' ,ordem;'
                
                con.query(query, function (err, result, fields) {

                    if (err) throw err;
                    
                    //Seleciona a primeira divisao
                    let divisao = result[0].divisao;
                    let equacao = "";
                    let indisponivel = 0;
                    if(result[0].valor!=null){
                        if(result[0].antecessor==null){
                            equacao = result[0].valor.toString(); 
                        }else{
                            equacao = result[0].antecessor;
                            equacao = equacao.concat(result[0].valor.toString());
                        }
                    }else{
                        indisponivel = 1;
                    } 
                //Busca todas valores das informações de todas divisoes
                    for(let i=1;i<result.length;i++){
                //Quando a busca encontrar outra divisao a equacao da divisao anterior estará completa
                        if(divisao != result[i].divisao){           
                            if(indisponivel == 0){      
                                output.push(new Indicador(divisao, Resolver(equacao)));
                            }else{
                                //console.log("INDICADOR INDISPONIVEL PARA DIVISAO "+ divisao);
                            }
                            divisao = result[i].divisao;
                            equacao = "";
                            indisponivel = 0;           
                        }
                //Adicionar o valor e o antecessor à formula do indicador
                        if(result[i].valor!=null){
                            if(result[i].antecessor==null){
                                equacao = equacao.concat(result[i].valor.toString());
                            }else{
                                equacao = equacao.concat(result[i].antecessor);
                                equacao = equacao.concat(result[i].valor.toString());
                            }
                        }
                        else{
                            indisponivel =1;
                        }
                    }
                    if(indisponivel == 0){
                        output.push(new Indicador(divisao, Resolver(equacao)));     
                    }else{
                        //console.log("INDICADOR INDISPONIVEL PARA DIVISAO "+ divisao);
                    }
                    
                    //Retorna um JSON com a divisao e o valor do indicador
                    JSON.stringify(output);
                    if( output != []){
                        return self.res.status(200).json(output);
                    }
                });
            });
        }
        catch(error){

            return self.res.status(500).json({
                status: 'error',
                error: error
            });
        }
    }
}

module.exports = MapService