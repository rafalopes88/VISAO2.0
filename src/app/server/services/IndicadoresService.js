const mysqlssh = require('mysql-ssh');
const fs = require('fs');



class IndicadoresService{

	constructor(req, res){
        this.req = req
        this.res = res
    }

    GetIndicadores(){

    	let self = this;
        let mapItem = this.req.body.mapItem;
        let indicadores = [];
        let velhaCategoria = "";
        let nome = [];
        let cod = [];

        try{
        	
        	mysqlssh.connect(
			    {
			        host: '172.25.0.22',
			        user: 'rafael',
			        password: 'ibict2017'
			    },
			    {
			        host: 'localhost',
			        user: 'root',
			        password: 'ibict2017',
			        database: 'visaodb'
			    }
			).then(client => {
    			client.query('SELECT cod_indicador, cat.descricao as categoria, ind.descricao as indicador '+
    				'FROM categoria cat inner join indicador ind on cat.cod_categoria = ind.cod_categoria '+
    				'order by categoria;', function (err, data) {
    				data.forEach(function(item, index, array) {	
                        if(velhaCategoria != item.categoria){
                            if(velhaCategoria == ""){
                                velhaCategoria = item.categoria;
                                nome.push(item.indicador);
                                cod.push(item.cod_indicador);
                            }
                            else{
                                indicadores.push({"categoria": velhaCategoria, "nome": nome, "cod": cod});
                                velhaCategoria = item.categoria;
                                nome = [item.indicador];
                                cod = [item.cod_indicador]; 
                                
                            }
                            
                        }
                        else{
                            nome.push(item.indicador);
                            cod.push(item.cod_indicador);
                        }

                           					
			        });
                    indicadores.push({"categoria": velhaCategoria, "nome": nome, "cod": cod});
                    
                    console.log(indicadores);
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

}

module.exports = IndicadoresService