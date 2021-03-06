import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Rx';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Dados} from './Dados';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class MapService {

	private mapUrl = './assets/geojson/';  // URL to web api

  	constructor( private http: HttpClient, private messageService: MessageService) { }

  	GetDivisoes (divisao): Observable<any> {
	    return this.http.get<any>(this.mapUrl + divisao).
	    pipe(tap(geometrias => this.log(`fetched geometria`)),
	        catchError(this.handleError('getDivisoes', []))
	    );
	}
	GetBrasil (): Observable<any> {
	    return this.http.get<any>(this.mapUrl + "brasil.json").
	    pipe(tap(geometrias => this.log(`fetched brasil`)),
	        catchError(this.handleError('getBrasil', []))
	    );
	}
	AplicaIndicador (divisao, codIndicador, filtrosSelecionados): Observable<Dados[]> {
	    return this.http.get<any>("http://localhost:3000/api/AplicarIndicador", { params: {divisao: divisao ,codIndicador: codIndicador, filtrosSelecionados: filtrosSelecionados}}).
	    pipe(tap(geometrias => this.log(`fetched indicador`)),
	        catchError(this.handleError('AplicaIndicador', []))
	    );
                         
	}
	

	private log(message: string) {
		console.log('MapService: ' + message);
	}


	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {
	 
	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead
	 
	    // TODO: better job of transforming error for user consumption
	    this.log(`${operation} failed: ${error.message}`);
	 
	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}
}
