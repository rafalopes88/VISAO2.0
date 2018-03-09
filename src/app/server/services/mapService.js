const mysqlssh = require('mysql-ssh');
const fs = require('fs');
var S = require('string');
const assert = require('assert');
var stringify = require('json-stringify');

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

    GetDivisoes(){

    	let self = this;
        let mapItem = this.req.body.mapItem;
        try{
        	let Municipios = [];
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
    			client.query('SELECT cod_estado, Nome,  ST_AsWKT(geometria) as geo FROM estado where geometria is not null', function (err, data) {
    				data.forEach(function(item, index, array) {

					
						let sujo = item.geo;
						let Perimetro;
						let Par;

						if(sujo != null){
							sujo = S(sujo).chompRight('))').s;
							sujo = S(sujo).chompLeft('POLYGON((').s;

	      					Perimetro = sujo;
	         			}

			          	Municipios.push(new Municipio(item.Nome, item.cod_municipio, Perimetro));
			        });
			        if( Municipios != []){
			        	return self.res.status(200).json({
		                    status: 'success',
		                    data: Municipios
		                })
			        }
			        mysqlssh.close();
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

    AplicarIndicador(req, res){
    	console.log(req.query);
    }
}

module.exports = MapService