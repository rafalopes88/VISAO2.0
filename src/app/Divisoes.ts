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
}