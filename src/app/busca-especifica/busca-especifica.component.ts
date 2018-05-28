import { Component, OnInit , Input} from '@angular/core';


@Component({
  selector: 'app-busca-especifica',
  templateUrl: './busca-especifica.component.html',
  styleUrls: ['./busca-especifica.component.css']
})
export class BuscaEspecificaComponent implements OnInit {

	@Input() divisoes :string;
  	constructor() { }

  	ngOnInit() {
  	}
}
