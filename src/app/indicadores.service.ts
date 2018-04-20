import { MessageService } from './message.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Indicador } from './Indicador';
import { Filtro } from './Filtro';
import { of } from 'rxjs/observable/of';

@Injectable()
export class IndicadoresService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  	private indicadoresUrl = 'http://localhost:3000/api/';

	private log(message: string) {
		this.messageService.add('MapService: ' + message);
	}

	GetAno (indicadorSelecionado): Observable<number[]> {
	    return this.http.get<number[]>(this.indicadoresUrl+ "GetAno" , { params: {codIndicador: indicadorSelecionado}}).
	    pipe(tap(geometrias => this.log(`fetched anos`)),
	        catchError(this.handleError('GetAno', []))
	    );                         
	}

	GetCategorias (): Observable<Indicador[]> {
	    return this.http.get<Indicador[]>(this.indicadoresUrl+ "GetIndicadores").
	    pipe(tap(geometrias => this.log(`fetched indicadores`)),
	        catchError(this.handleError('GetCategorias', []))
	    );                         
	}

	AplicarFiltro (divisao,filtrosSelecionados):Observable<number[]>{
		return this.http.get<number[]>(this.indicadoresUrl+ "AplicarFiltro" , { params: {divisao: divisao,filtros: filtrosSelecionados}}).
	    pipe(tap(geometrias => this.log(`Filtro Aplicado`)),
	        catchError(this.handleError('AplicarFiltro', []))
	    );
	}

	GetFiltro ():Observable<Filtro[]>{
		return this.http.get<Filtro[]>(this.indicadoresUrl+ "GetFiltro").
	    pipe(tap(geometrias => this.log(`fetched Filtro`)),
	        catchError(this.handleError('AplicarFiltro', []))
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
	    console.log(`${operation} failed: ${error.message}`);
	 
	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}
}
