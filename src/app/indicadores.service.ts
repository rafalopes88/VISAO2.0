import { MessageService } from './message.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Indicador } from './Indicador';
import { of } from 'rxjs/observable/of';

@Injectable()
export class IndicadoresService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  	private indicadoresUrl = 'http://localhost:3000/api/';

	private log(message: string) {
		this.messageService.add('MapService: ' + message);
	}

	GetCategorias (): Observable<Indicador[]> {
	    return this.http.get<Indicador[]>(this.indicadoresUrl+ "GetIndicadores").
	    pipe(tap(geometrias => this.log(`fetched indicadores`)),
	        catchError(this.handleError('GetCategorias', []))
	    );
                         
	 }

	GetDadosIndicador(): Observable<Indicador[]>{
		return this.http.get<Indicador[]>(this.indicadoresUrl + "Getdados").
	    pipe(tap(geometrias => this.log(`fetched dados`)),
	        catchError(this.handleError('GetDadosIndicador', []))
	    );
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
