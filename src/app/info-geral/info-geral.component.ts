import { Component, OnInit } from '@angular/core';
import { InfoGeral } from '../InfoGeral';
import { InfoGeralService } from '../info-geral.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-info-geral',
  templateUrl: './info-geral.component.html',
  styleUrls: ['./info-geral.component.css']
})
export class InfoGeralComponent implements OnInit {
	infoGerais : InfoGeral[];
	divisao: string;

	constructor(private infoGeralService :InfoGeralService, private globalService : GlobalService) { }

	ngOnInit() {
		//Alterar municipio para Divisao
		this.GetInfoGeral('municipio');
		this.globalService.divisaoAtual.subscribe(divisao => this.divisao = divisao);
	}


	GetInfoGeral(divisao): void{
	  	this.infoGeralService.GetInfoGeral(divisao).subscribe(infoGerais => {this.infoGerais = infoGerais;/*console.log(infoGerais);*/});
	}

}
