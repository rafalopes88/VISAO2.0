import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { IndicadoresService } from '../indicadores.service';
import { Indicador } from '../Indicador';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {
	indicadores : Indicador[];
	anos : number[];
	categoriaSelecionada: string;
	indicadorSelecionado: number;
	constructor(private indService :IndicadoresService, mapService : MapService) { }

	ngOnInit() {
		this.GetCategorias();
		this.GetAno();
	}

	OnSelectCategoria(categoria) : void{
		if(this.categoriaSelecionada != categoria)
			this.categoriaSelecionada = categoria;
		else
			this.categoriaSelecionada = null;
	}
	AlteraIndicador(indicadorSelecionado) : void{
		this.indicadorSelecionado = indicadorSelecionado;

	}

	GetCategorias(): void{
		this.indService.GetCategorias()
	  		 .subscribe(indicadores =>  this.indicadores = indicadores);
	}	

	GetAno(): void{
		this.indService.GetAno()
			.subscribe(anos => this.anos = anos);
	}
}
