let mysql = require('mysql');
const fs = require('fs');


class IndicadoresService{

	constructor(req, res){
        this.req = req
        this.res = res
    }
//Funcao para coletar os indicadores e categoria pertencentes ao VISAO
    GetIndicadores(){

    	let self = this;
        let mapItem = this.req.body.mapItem;
        let indicadores = [];
        let velhaCategoria = "";
        let nome = [];
        let cod = [];

        try{        	
        	var con = mysql.createConnection({
              host: "localhost",
              user: "root",
              password: 'ibict2017',
              database: "visao"
            });
			con.connect(function(err) {
    			if (err) throw err;
                    con.query('SELECT ind.cod_indicador as codigo,cat.nome as categoria,ind.nome as indicador '+
                    'FROM indicador ind '+
                    'INNER JOIN categoria cat on cat.cod_categoria = ind.categoria_cod_categoria;', function (err, data) {
                    if (err) throw err;
    				data.forEach(function(item, index, array) {	
                        if(velhaCategoria != item.categoria){
                            if(velhaCategoria == ""){
                                velhaCategoria = item.categoria;
                                nome.push(item.indicador);
                                cod.push(item.codigo);
                            }
                            else{
                                indicadores.push({"categoria": velhaCategoria, "nome": nome, "cod": cod});
                                velhaCategoria = item.categoria;
                                nome = [item.indicador];
                                cod = [item.codigo];                                 
                            }                            
                        }
                        else{
                            nome.push(item.indicador);
                            cod.push(item.codigo);
                        }                           					
			        });
                    indicadores.push({"categoria": velhaCategoria, "nome": nome, "cod": cod});
                    
                    JSON.stringify(indicadores);
                    
			        if( indicadores != []){                        
			        	return self.res.status(200).json(indicadores);
			        }     	    			        
    			});
			})
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    GetAno(){
        
        let self = this;
        let codind = this.req.query.codIndicador;
        //Verificar se esta recebendo Codigo do Indicador correto
        //console.time("dbsave");
        try{  

            var con = mysql.createConnection({
              host: "localhost",
              user: "root",
              password: 'ibict2017',
              database: "visao"
            });
            con.connect(function(err) {
                if (err) throw err;
                //Pesquisa sobre os anos do indicador 1, MUDAR PARA INPUT
                con.query('SELECT YEAR(data) ano FROM indicador_informacao ii'+ 
                    ' INNER JOIN indicador i ON i.cod_indicador = ii.indicador_cod_indicador'+
                    ' INNER JOIN informacao info on ii.informacao_cod_informacao = info.cod_informacao'+
                    ' WHERE cod_indicador = 1'+//+codind+
                    ' GROUP BY ano;', function (err, data) {
                    if (err) throw err;
                    let anos = [];
                    data.forEach(function(item, index, array) {anos.push(item.ano); });
                    //console.timeEnd("dbsave");
                    JSON.stringify(anos);
                    if( anos != []){                        
                        return self.res.status(200).json(anos);
                    } 
                });
            });
        }catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

}

module.exports = IndicadoresService