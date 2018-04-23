const det = require('./Detalhamento');
let mysql = require('mysql');
const fs = require('fs');
let S = require('string');
const assert = require('assert');
let stringify = require('json-stringify');
const debug = 0;
const IndService = require('./IndicadoresService');

let detG = "";

class Municipio{

	constructor(n,c,g){
	    this.nome = n;
	    this.cod = c;
	    this.geometria = g;
	}
}


class Indicador{
    constructor(m,v,f){
        this.municipio= m;
        this.valor= v;
        this.filtros = f;
    }
}
class MunFil{
    constructor(c,f){
        this.codigo = c;
        this.filtros = f;
    }
}

class MapService{
    
    constructor(req, res){
        this.req = req
        this.res = res
    }


    AplicarIndicador(req, res){
        let self = this;
        let detG = req.query.divisao;
        let filtros = req.query.filtrosSelecionados;
     

        //FunÃ§Ã£o para transformar o string da formula em um resultado
        function Resolver(eq){  
            return eval(eq).toFixed(2);
        }

        try{
            let output = [];
            let munFiltro = [];
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

                let div = {nome:'', join: ''};                
                
                let detObj = new det(req, res);
                detObj.DetalhamentoGeo(div, detG);
                if(filtros == undefined){
                    filtros = [];
                }

            if (err) throw err;
//Pegar os filtros aplicados aos municipios
            query = 'SELECT '+div.nome+' divisao, cod_FiltroGeografico filtro FROM filtrogeografico fg '+
                        ' INNER JOIN municipio_filtrogeografico mf ON fg.cod_FiltroGeografico = mf.filtroGeografico_cod_FiltroGeografico '+
                        ' INNER JOIN municipio m on m.cod_municipio = mf.municipio_cod_municipio '+ div.join;
                        
                for (var i = 0, len = filtros.length; i < len; i++) {
                    if(i==0){
                        query = query+' WHERE cod_FiltroGeografico = '+filtros[0];
                    }else{
                        query = query + ' or cod_FiltroGeografico = '+filtros[i];
                    }
                }  
                query = query + ' ORDER BY divisao';           
                con.query(query, function (err, result, fields) {

                    let aux = [];
                    let codAux = result[0].divisao;

                    for(var i = 0, len = result.length; i < len; i++){
                        if(result[i].divisao != codAux){
                            munFiltro.push(new MunFil(codAux,aux));
                            codAux = result[i].divisao;
                            aux = [];
                            aux.push(result[i].filtro);
                        }else{
                            aux.push(result[i].filtro);
                        }
                        if(i+1==len){
                            munFiltro.push(new MunFil(codAux,aux));
                        }
                    }
                });

                query = 'SELECT ordem,antecessor, uni.nome,  '+div.nome+' as divisao, sum(vi.valor) as valor'+
                        ' FROM indicador_informacao ii '+
                        'INNER JOIN indicador i ON i.cod_indicador = ii.indicador_cod_indicador '+
                        'INNER JOIN unidade uni ON i.unidade_cod_unidade = uni.cod_unidade '+
                        'INNER JOIN informacao info ON info.cod_informacao = ii.informacao_cod_informacao '+
                        'INNER JOIN valor_informacao vi ON vi.informacao_cod_informacao = info.cod_informacao '+
                        'INNER JOIN municipio m ON vi.municipio_cod_municipio = m.cod_municipio '+ div.join;
                if(filtros.length!=0){
                    query = query + 'INNER JOIN municipio_filtrogeografico mf on m.cod_municipio = mf.municipio_cod_municipio';
                } 
                query = query +' WHERE i.cod_indicador = '+codind;
                for (var i = 0, len = filtros.length; i < len; i++) {
                    if(i==0){
                        query = query+' and (filtroGeografico_cod_FiltroGeografico = '+filtros[0];
                    }else{
                        query = query + ' or filtroGeografico_cod_FiltroGeografico = '+filtros[i];
                    }
                    if(i+1==len){
                        query = query + ' ) ';
                    }
                }
                query = query + ' GROUP BY ordem, antecessor, divisao ORDER BY '+div.nome+ ' ,ordem;';
                
                con.query(query, function (err, result, fields) {

                    let aux = 0;

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
                //Busca todos valores das informações de todas divisoes
                    for(let i=1;i<result.length;i++){
                //Quando a busca encontrar outra divisao a equacao da divisao anterior estará completa
                        if(divisao != result[i].divisao){           
                            if(indisponivel == 0){      
                                //COLOCAR FILTRO
                                if(filtros.length == 0){
                                    output.push(new Indicador(divisao, Resolver(equacao),[]));
                                }else{
                                    output.push(new Indicador(divisao, Resolver(equacao),munFiltro[aux].filtros));
                                    aux++;
                                }
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
                        //COLOCAR FILTRO
                        if(filtros.length == 0){
                            output.push(new Indicador(divisao, Resolver(equacao),[]));
                        }else{
                            output.push(new Indicador(divisao, Resolver(equacao),munFiltro[aux].filtros));
                        }    
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