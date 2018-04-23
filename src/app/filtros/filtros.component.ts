import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IndicadoresService } from '../indicadores.service';
import { Filtro } from '../Filtro';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {

	@Input() aba :string;
	filtros : Filtro[];
	nomeDivisaoAtual :string;
	codsAuxs: number[] = [];
	@Output() codFiltros = new EventEmitter<number[]>();
	
  	constructor(private indService :IndicadoresService, private globalService : GlobalService) { }

	ngOnInit() {
		this.GetFiltro();
	}

	GetFiltro():any{
		this.indService.GetFiltro()
			.subscribe(filtros => {this.filtros = filtros;console.log(filtros);});
	}

	AddFiltro(event, cod){
		event.target.checked ? this.codsAuxs.push(cod) : this.codsAuxs.splice(this.codsAuxs.indexOf(cod), 1);
		this.codFiltros.emit(this.codsAuxs);
	}
}
