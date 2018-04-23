import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	aba: string;
	indicadorSelecionado:number;
	filtros:number[];
	constructor() { }

	ngOnInit() {
	}
	SetIndicador(indicadorSelecionado: number){
		this.indicadorSelecionado = indicadorSelecionado;
	}
	SetFiltros(filtros){
		this.filtros = filtros;
	}
	SetAba(aba:string){
		this.aba = aba;
	}
}
