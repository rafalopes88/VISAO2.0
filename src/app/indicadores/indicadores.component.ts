import { Component, OnInit,  EventEmitter, Input, Output  } from '@angular/core';
import { MapService } from '../map.service';
import { IndicadoresService } from '../indicadores.service';
import { Indicador } from '../Indicador';



@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

	@Input() aba :string;
	indicadores : Indicador[];
	anos : number[];
	
	categoriaSelecionada: string;
	@Output() indicadorSelecionado = new EventEmitter<number>();

	constructor(private indService :IndicadoresService, mapService : MapService) { }

	ngOnInit() {
		this.GetCategorias();
	}

	OnSelectCategoria(categoria) : void{
		this.categoriaSelecionada = categoria;
	}
	AlteraIndicador(indicadorSelecionado) : void{
		this.indicadorSelecionado.emit(indicadorSelecionado);
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
}