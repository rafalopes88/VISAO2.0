import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapService } from './map.service';
import { IndicadoresService } from './indicadores.service';
import { InfoGeralService } from './info-geral.service';
import { GlobalService } from './global.service';
import { MessageService } from './message.service';
import {HttpClientModule} from '@angular/common/http';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { InfoGeralComponent } from './info-geral/info-geral.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { BuscaEspecificaComponent } from './busca-especifica/busca-especifica.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    IndicadoresComponent,
    InfoGeralComponent,
    FiltrosComponent,
    BuscaEspecificaComponent
  ],
  imports: [
    BrowserModule, LeafletModule.forRoot(),HttpClientModule, AngularFontAwesomeModule
  ],
  providers: [MapService, MessageService, IndicadoresService,InfoGeralService,GlobalService],// InfoGeralComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
