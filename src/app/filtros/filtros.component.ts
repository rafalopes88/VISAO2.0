import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {

	@Input() aba :string;
	
  	constructor() { }

	ngOnInit() {	
	}	

}
