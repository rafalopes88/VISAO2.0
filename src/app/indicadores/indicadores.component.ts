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
	categoriaSelecionada: string;
	indicadorSelecionado: number;
	constructor(private indService :IndicadoresService, mapService : MapService) { }

	ngOnInit() {
		this.GetCategorias();
	}

	OnSelectCategoria(categoria) : void{
		this.categoriaSelecionada = categoria;
	}
	AlteraIndicador(indicadorSelecionado) : void{
		this.indicadorSelecionado = indicadorSelecionado;
	}

	GetCategorias(): void{
		this.indService.GetCategorias()
	  		 .subscribe(indicadores =>  this.indicadores = indicadores);
	}	


}
