import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { IndicadoresService } from '../indicadores.service';
import { Indicador } from '../Indicador';
import { Filtro } from '../Filtro';
import { GlobalService } from '../global.service';

let nomeDivisaoAtual :string;

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {
	indicadores : Indicador[];
	filtros : Filtro[];
	anos : number[];
	municipios : number[];
	categoriaSelecionada: string;
	indicadorSelecionado: number;
	constructor(private indService :IndicadoresService, mapService : MapService,private globalService : GlobalService) { }

	ngOnInit() {
		this.globalService.divisaoAtual.subscribe(divisao => nomeDivisaoAtual = divisao);
		this.GetCategorias();
		/*Teste:*/ this.AplicarFiltro(nomeDivisaoAtual,[1,2]);
		//this.GetFiltro();
	}

	OnSelectCategoria(categoria) : void{
		this.categoriaSelecionada = categoria;
	}
	AlteraIndicador(indicadorSelecionado) : void{
		this.indicadorSelecionado = indicadorSelecionado;
		this.GetAno(indicadorSelecionado);
	}

	GetCategorias(): void{
		this.indService.GetCategorias()
	  		 .subscribe(indicadores =>  this.indicadores = indicadores);
	}	

	GetAno(indicadorSelecionado): void{
		this.indService.GetAno(indicadorSelecionado)
			.subscribe(anos => this.anos = anos);
	}

	AplicarFiltro(divisao, filtrosSelecionados):any{
		console.log("Entrou no AplicarFiltro");
		this.indService.AplicarFiltro(divisao,filtrosSelecionados)
			.subscribe(municipios => this.municipios = municipios);
	}

	GetFiltro():any{
		this.indService.GetFiltro()
			.subscribe(filtros => {this.filtros = filtros;console.log(filtros);});
	}
}
