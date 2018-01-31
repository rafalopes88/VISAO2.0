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
        let novaCategoria = "";
        let result = [];

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
    			client.query('SELECT cat.descricao as categoria, ind.descricao as indicador '+
    				'FROM categoria cat inner join indicador ind on cat.cod_categoria = ind.cod_categoria '+
    				'order by categoria;', function (err, data) {
    				data.forEach(function(item, index, array) {	
                        if(typeof indicadores[item.categoria] !== 'undefined'){
                            indicadores[item.categoria].push(item.indicador);
                        }
                        else{
                            indicadores[item.categoria] = [];
                            indicadores[item.categoria].push(item.indicador);   
                        }
    					
			        });
                    
                    for (let i in indicadores){
                        result.push({"categoria": i ,"nome" :indicadores[i] });
                    }
                    JSON.stringify(result);
			        if( indicadores != []){
                        
			        	return self.res.status(200).json(result);
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