let mysql = require('mysql');
const fs = require('fs');
const det = require('./Detalhamento');


class InfoGeralService{

	constructor(req, res){
        this.req = req
        this.res = res
    }

//Função para pegar os valores dos dados Gerais disponiveis para cada munícipio
    GetInfoGeral(req,res){
    	let self = this;
    	let detG = req.query.divisao;

    	 try{        	
        	var con = mysql.createConnection({
              host: "localhost",
              user: "root",
              password: 'ibict2017',
              database: "visao"
            });
			con.connect(function(err) {
				var div = {nome:'', join: ''};
				
				let detObj = new det();
                detObj.DetalhamentoGeo(div,detG);

    			if (err) throw err;
    			/*PIB, PIB per capita, rendimento homens, rendimento mulheres, histórico do pib, população, superior completo*/
                con.query('SELECT info.nome info,YEAR(info.data) ano, sum(vi.valor) valor, '+div.nome+' as divisao FROM informacao info'+
				' INNER JOIN'+
					' (SELECT nome, MAX(data) AS Atual'+
					' FROM informacao'+
					// Opção de incluir ano nos Dados Gerais
					//' WHERE data <= "'+ano+'-12-31"'+
					' GROUP BY nome) grupoi'+ 
					' ON info.nome = grupoi.nome AND info.data = grupoi.Atual'+
				' INNER JOIN unidade uni ON info.unidade_cod_unidade = uni.cod_unidade'+
				' INNER JOIN valor_informacao vi ON vi.informacao_cod_informacao = info.cod_informacao'+
				' INNER JOIN municipio m ON vi.municipio_cod_municipio = m.cod_municipio '+div.join+
				' WHERE info.nome = "População"'+
				' or info.nome = "PIB"'+
				//' or info.nome = "Rendimento Homens"'+
				//' or info.nome = "Rendimentos Mulheres"'+
				//' or info.nome = "Superior Completo"'+
				' GROUP BY info.nome,divisao'+
				' ORDER BY '+div.nome+', info.nome;', function (err, infoGerais) {
					JSON.stringify(infoGerais);

					if( infoGerais != []){                        
			        	return self.res.status(200).json(infoGerais);
			        }
                });
            });
    	}catch(error){

            return self.res.status(500).json({
                status: 'error',
                error: error
            });
        }
	}
}
module.exports = InfoGeralService