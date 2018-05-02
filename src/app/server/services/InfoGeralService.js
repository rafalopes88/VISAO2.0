//let mysql = require('mysql');
const c = require('./Conexao');
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
        	var con = c.Conectar();
			con.connect(function(err) {
				var div = {nome:'', join: ''};
				
				let detObj = new det();
                detObj.DetalhamentoGeo(div,detG);
    			if (err) throw err;
    			/*PIB, PIB per capita, rendimento homens, rendimento mulheres, histórico do pib, população, superior completo*/
                con.query('SELECT info.nome,YEAR(dataAquisicao) ano, sum(vi.valor) valor, '+div.nome+' divisao '+
				' FROM informacao info'+
				' INNER JOIN unidade uni ON info.unidade_cod_unidade = uni.cod_unidade'+
				' INNER JOIN valor_informacao vi ON vi.informacao_cod_informacao = info.cod_informacao'+
				' INNER JOIN municipio m ON vi.municipio_cod_municipio = m.cod_municipio '+div.join+
				' INNER JOIN'+
					 ' (SELECT cod_informacao, MAX(dataAquisicao) AS Atual'+
					 ' FROM informacao i'+
					 ' INNER JOIN valor_informacao vi ON vi.informacao_cod_informacao = i.cod_informacao'+
					 // Opção de incluir ano nos Dados Gerais
					//' WHERE data <= "'+ano+'-12-31"'+
					 ' GROUP BY cod_informacao) grupoi ON info.cod_informacao = grupoi.cod_informacao AND vi.dataAquisicao = grupoi.Atual'+
				' WHERE info.nome = "População"'+
				' or info.nome = "PIB"'+
				//' or info.nome = "Rendimento Homens"'+
				//' or info.nome = "Rendimentos Mulheres"'+
				//' or info.nome = "Superior Completo"'+
                ' GROUP BY '+div.nome+', info.nome, ano'+
				' ORDER BY '+div.nome+', info.nome;', function (err, infoGerais) {
					JSON.stringify(infoGerais);
					//console.log(infoGerais);

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