class Detalhamento{
	constructor(req, res){
        this.req = req
        this.res = res
    }
    //Funcao que configura a pesquisa ao banco de dados para o detalhamento geográfico atual
    DetalhamentoGeo(div,detG){
        div.nome = "vi.municipio_cod_municipio";
        div.join = "";
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
}

module.exports = Detalhamento;