import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { InfoGeral } from './InfoGeral';
import { of } from 'rxjs/observable/of';
import {Dados} from './Dados';

@Injectable()
export class InfoGeralService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private indicadoresUrl = 'http://localhost:3000/api/';

  private log(message: string) {
		this.messageService.add('MapService: ' + message);
	}

  GetInfoGeral(divisao): Observable<InfoGeral[]>{
  	console.log("Entrou no info-Geral.service.js");
		return this.http.get<InfoGeral[]>(this.indicadoresUrl + "GetInfoGeral",{ params: {divisao: divisao }}).
	    pipe(tap(geometrias => this.log(`fetched info gerais`)),
	        catchError(this.handleError('GetInfoGeral', []))
	    );
	}

  private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {
	 
	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead
	 
	    // TODO: better job of transforming error for user consumption
	    console.log(`${operation} failed: ${error.message}`);
	 
	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}

}
