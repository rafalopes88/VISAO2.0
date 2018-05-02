import { Component, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapService } from '../map.service';
import {Dados} from '../Dados';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { GlobalService } from '../global.service';


//import {InfoGeralComponent} from '../info-geral/info-geral.component';

declare let $:any;

let dados: Dados[];
let nomeDivisaoAtual :string;
let min, max;
let _that;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
	
	map : L.Map;
	
	@Input() codIndicador :number;
	@Input() filtrosSelecionados : number[];
	brasil: L.GeoJSON = new L.GeoJSON();
	divisaoAtual: L.GeoJSON;
	municipio: L.GeoJSON;
	mesoRegiao: L.GeoJSON;
	estado: L.GeoJSON;
	displayData: boolean = false;
	dadoMostrado: string;
	dataPosX : string;
	dataPosY: string;
	


	//constructor(private mapService: MapService,private globalService : GlobalService) {}
	constructor(private mapService: MapService,private globalService : GlobalService/*, private infoGeralComp : InfoGeralComponent*/) {}

	ngOnInit() {
		_that = this;
		Observable.fromEvent(document.body, 'mousemove').subscribe((mouse:MouseEvent) => {
	    	_that.dataPosX = (mouse.pageX + 50)  + "px";
	    	_that.dataPosY = (mouse.pageY+ 50) + "px";
		});
		this.globalService.divisaoAtual.subscribe(divisao => nomeDivisaoAtual = divisao);
		this.InitMap();
		this.GetBrasil()
		this.GetDivisoes('municipio');
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

	GetBrasil(){
		this.mapService.GetBrasil()
      		 .subscribe(brasil =>  this.AplicaBrasil(brasil.features));
	}

	AplicaBrasil(brasil){
		this.brasil.addData(brasil[0].geometry);
		
  		this.brasil.addTo(this.map);
	}

	NovoIndicador(){
		dados = new Array();
		this.AplicarIndicador();
	}
	AplicarIndicador(){
		if(this.codIndicador != null)
			this.mapService.AplicaIndicador(nomeDivisaoAtual, this.codIndicador, this.filtrosSelecionados)
		  		 .subscribe(dados => this.ColorirMapa(dados));

	}

	AlteraDivisao(divisao){
		
		this.divisaoAtual.remove();
		this.globalService.MudarDivisao(divisao);
		nomeDivisaoAtual = divisao;
		//this.infoGeralComp.GetInfoGeral(divisao);

		if(divisao== 'municipio'){
			this.divisaoAtual = this.municipio;
			if(dados != null){
				if(!dados[nomeDivisaoAtual])
					this.AplicarIndicador();
				else
					this.divisaoAtual.addTo(this.map);
			}
		}
		else if(divisao== 'mesoRegiao'){
			if( this.mesoRegiao == null){
				this.GetDivisoes(divisao);
			}
			else{
				this.divisaoAtual = this.mesoRegiao;
				if(dados != null){
					if(!dados[nomeDivisaoAtual])
						this.AplicarIndicador();
					else
						this.divisaoAtual.addTo(this.map);
					
				}
			}
			
		}
		else{
			if( this.estado == null){
				this.GetDivisoes(divisao);
			}
			else{

				this.divisaoAtual = this.estado;
				if(dados != null){
					if(!dados[nomeDivisaoAtual])
						this.AplicarIndicador();
					else
						this.divisaoAtual.addTo(this.map);
				}
			}
		}		
		
	}

	HighlightFeature(e) {
	    let layer = e.target;
	    
	    let index = dados[nomeDivisaoAtual].map(function(x) {return x.cod; }).indexOf(Number(layer.feature.properties.CD_GEOCMU));
	    if( index != -1){
		    	let layer = e.target;
		    layer.setStyle({
		        weight: 3
		    });
		   

		    if (!L.Browser.ie && !L.Browser.edge) {
		        layer.bringToFront();
		    }
	    	_that.displayData = true;
	    	_that.dadoMostrado = layer.feature.properties.NOME + ":"+dados[nomeDivisaoAtual][index].valor;
	    }
	}

	ResetHighlight(e) {
		let layer = e.target;
		let index = dados[nomeDivisaoAtual].map(function(x) {return x.cod; }).indexOf(Number(layer.feature.properties.CD_GEOCMU));
	    if( index != -1){
		    layer.setStyle({
		    	weight: 0.5
		    });
		}
	    _that.displayData = false;
	}

	ColorirMapa(dados1){

		dados[nomeDivisaoAtual] = new Array();
		dados[nomeDivisaoAtual] = dados1.map(function(x) {return {"cod":x.municipio, "valor": Number(x.valor)}; });

		min = Math.min.apply(Math,dados[nomeDivisaoAtual].map(function(o){return o.valor;}));
  		max = Math.max.apply(Math,dados[nomeDivisaoAtual].map(function(o){return o.valor;}));

		this.divisaoAtual.setStyle(this.Style);
		this.divisaoAtual.eachLayer(function(layer){
			layer.on({
		        mouseover: _that.HighlightFeature,
		        mouseout: _that.ResetHighlight
	    	});
		});
		this.divisaoAtual.addTo(this.map);
	}

	Style(feature) { 

		let low = [5, 69, 54];
  		let high = [151, 83, 34];
  		let delta;
		let color = [];
		let outlineWeight = 0, zIndex = 1;
  		let strokeColorVal = '#fff';
  		let opacity = 0;
  		let index = dados[nomeDivisaoAtual].map(function(x) {return x.cod; }).indexOf(Number(feature.properties.CD_GEOCMU));
		if( index != -1){
			delta = (dados[nomeDivisaoAtual][index].valor  - min)/(max - min);
			
			for (let i = 0; i < 3; i++) {
		      color[i] = (high[i] - low[i]) * delta + low[i];
		    }
		    outlineWeight = 0.5;
		    opacity = 0.75;
		}
		
        return {
            weight: outlineWeight,
		    color: strokeColorVal,
		    fillColor: 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)',
		    fillOpacity: opacity
        };
    }

	SalvarAplicarDivisoes(geometrias, divisao): void{

		if(divisao == 'municipio'){
			this.municipio = new L.GeoJSON(geometrias);
			this.divisaoAtual = this.municipio;
		}
		else if (divisao == 'mesoRegiao'){
			this.mesoRegiao = new L.GeoJSON(geometrias);
			this.divisaoAtual = this.mesoRegiao
		}
		else {
			this.estado = new L.GeoJSON(geometrias);
			this.divisaoAtual = this.estado
		}
		nomeDivisaoAtual = divisao;
		
		if(dados != null){
			if(!dados[nomeDivisaoAtual]){

				this.AplicarIndicador();
			}
			else
				this.divisaoAtual.addTo(this.map);
		}
	}

	GetDivisoes(divisao): void{
		this.mapService.GetDivisoes(divisao+".json")
      		 .subscribe(geometrias =>  this.SalvarAplicarDivisoes(geometrias, divisao));
	}

  
}
