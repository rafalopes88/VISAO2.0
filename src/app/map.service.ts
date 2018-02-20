import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Rx';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Geometria } from './geometria';


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
	AplicaIndicador (divisao, codIndicador): Observable<any> {
	    return this.http.get<any>("http://localhost:3000/api/AplicarIndicador", { params: {divisao: divisao ,codIndicador: codIndicador}}).
	    pipe(tap(geometrias => this.log(`fetched indicador`)),
	        catchError(this.handleError('AplicaIndicador', []))
	    );
                         
	}
	

	private log(message: string) {
		this.messageService.add('MapService: ' + message);
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
