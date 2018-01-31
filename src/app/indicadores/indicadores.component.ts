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
	constructor(private indService :IndicadoresService, mapService : MapService) { }

	ngOnInit() {
		this.Getindicadores();
	}

	OnSelect(categoria) : void{
		this.categoriaSelecionada = categoria;
	}

	Getindicadores(): void{
		this.indService.GetIndicadores()
	  		 .subscribe(indicadores =>  this.indicadores = indicadores);
	}	


}
