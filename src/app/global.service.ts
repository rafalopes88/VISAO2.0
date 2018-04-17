import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GlobalService {

  private divisao = new BehaviorSubject<string>("municipio");
  divisaoAtual = this.divisao.asObservable();

  constructor() { }

  MudarDivisao(divisao: string) {
    this.divisao.next(divisao)
  }

}
