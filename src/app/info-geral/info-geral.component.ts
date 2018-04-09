import { Component, OnInit } from '@angular/core';
import { InfoGeral } from '../InfoGeral';
import { InfoGeralService } from '../info-geral.service';

@Component({
  selector: 'app-info-geral',
  templateUrl: './info-geral.component.html',
  styleUrls: ['./info-geral.component.css']
})
export class InfoGeralComponent implements OnInit {
	infoGerais : InfoGeral[];

	constructor(private infoGeralService :InfoGeralService) { }

	ngOnInit() {
		//this.GetInfoGeral();
	}

	GetInfoGeral(): void{
	  	this.infoGeralService.GetInfoGeral().subscribe(infoGerais => this.infoGerais = infoGerais);//{this.infoGerais = infoGerais;console.log(infoGerais);});
	}

}
