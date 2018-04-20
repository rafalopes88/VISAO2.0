import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	aba: string;
	indicadorSelecionado:number;
	constructor() { }

	ngOnInit() {
	}
	SetIndicador(indicadorSelecionado: number){
		console.log(indicadorSelecionado);
		this.indicadorSelecionado = indicadorSelecionado;
	}
	SetAba(aba:string){
		this.aba = aba;
	}
}
