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
	nomeDivisaoAtual: string = "municipio";
	brasil: L.GeoJSON = new L.GeoJSON();


	constructor(private mapService: MapService) {}

	ngOnInit() {
		this.InitMap();
		this.GetDivisoes('municipio1');
	}
		
	InitMap(){
		this.map = L.map('map').setView([-15, -50], 3);

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmFmYWxvcGVzODgiLCJhIjoiY2o5MDYzb2JxMnYyMTJybjViM3g0d2lsZCJ9.n3NudHq80ot-J9oJ3I9KPQ', {
			    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			    maxZoom: 18,
			    id: 'mapbox.streets',
			    accessToken: 'your.mapbox.access.token'
			}).addTo(this.map);
		this.GetBrasil();
	}

	GetBrasil(){
		this.mapService.GetBrasil()
      		 .subscribe(brasil =>  this.AplicaBrasil(brasil.features));
	}

	AplicaBrasil(brasil){
		this.brasil.addData(brasil[0].geometry);
		
  		this.brasil.addTo(this.map);
	}
	AplicarIndicador(){
		this.mapService.AplicaIndicador(this.nomeDivisaoAtual, this.codIndicador)
      		 .subscribe();
	}

	AlteraDivisao(divisao){
		this.divisaoAtual.GetPerimetro().clearLayers();
		this.nomeDivisaoAtual = divisao;
		this.GetDivisoes(divisao);
	}

	SalvarAplicarDivisoes(divisao): void{
		this.divisaoAtual = new Divisoes();
		
		for (let i in divisao){
			this.divisaoAtual.AddNew(divisao[i].properties.CD_GEOCMU, divisao[i].properties.NM_MUNICIP, divisao[i].geometry);
		}

		this.divisaoAtual.GetPerimetro().addTo(this.map);

	}

	GetDivisoes(divisao): void{
		this.mapService.GetDivisoes(divisao+".json")
      		 .subscribe(geometrias =>  this.SalvarAplicarDivisoes(geometrias.features));
	}

  
}
