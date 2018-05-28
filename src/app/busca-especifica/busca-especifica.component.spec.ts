import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaEspecificaComponent } from './busca-especifica.component';

describe('BuscaEspecificaComponent', () => {
  let component: BuscaEspecificaComponent;
  let fixture: ComponentFixture<BuscaEspecificaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaEspecificaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaEspecificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
