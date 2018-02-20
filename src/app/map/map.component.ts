import { Component, OnInit, Input } from '@angular/core';
import { latLng, LatLng, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapService } from '../map.service';
import { Geometria } from '../geometria';
import  { Divisoes } from '../Divisoes';




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
	
	map : L.Map;
	divisaoAtual :Divisoes;
	@Input() codIndicador :number;

	constructor(private mapService: MapService) {}

	ngOnInit() {
		this.InitMap();
		this.GetDivisoes('geojs-100-mun.json');

	}
		
	InitMap(){
		this.map = L.map('map').setView([-15, -50], 3);

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmFmYWxvcGVzODgiLCJhIjoiY2o5MDYzb2JxMnYyMTJybjViM3g0d2lsZCJ9.n3NudHq80ot-J9oJ3I9KPQ', {
			    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			    maxZoom: 18,
			    id: 'mapbox.streets',
			    accessToken: 'your.mapbox.access.token'
			}).addTo(this.map);
	}
	AplicarIndicador(){
		console.log(this.codIndicador);
	}

	AlteraDivisao(divisao){
		this.divisaoAtual.GetPerimetro().clearLayers();
		this.GetDivisoes(divisao);
	}

	SalvarAplicarDivisoes(divisao): void{
		this.divisaoAtual = new Divisoes();
		for (let i in divisao){
			this.divisaoAtual.AddNew(divisao[i].id, divisao[i].nome, divisao[i].geometry);
		}

		this.divisaoAtual.GetPerimetro().addTo(this.map);

	}

	GetDivisoes(divisao): void{
		this.mapService.GetDivisoes(divisao)
      		 .subscribe(geometrias =>  this.SalvarAplicarDivisoes(geometrias.features));
	}

  
}
