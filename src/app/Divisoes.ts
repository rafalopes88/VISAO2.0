import * as L from 'leaflet';

export class Divisoes {
  private id: number[];
  private nome: string[];
  private perimetro: L.GeoJSON;

  constructor(){
  	this.id = new Array();
  	this.nome = new Array();
  	this.perimetro = new L.GeoJSON();
  }

  AddNew(id: number, nome:string, perimetro: any) : void{
  	this.id.push(id);
  	this.nome.push(nome);
  	this.perimetro.addData(perimetro);
  }

  GetPerimetro() : L.GeoJSON {
  	return this.perimetro;
  }

  GetColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
  }

  Style(feature) {
    return {
        fillColor: this.GetColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }
}