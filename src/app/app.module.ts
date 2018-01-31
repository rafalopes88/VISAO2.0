import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapService } from './map.service';
import { IndicadoresService } from './indicadores.service';
import { MessageService } from './message.service';
import {HttpClientModule} from '@angular/common/http';
import { IndicadoresComponent } from './indicadores/indicadores.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    IndicadoresComponent
    
  ],
  imports: [
    BrowserModule, LeafletModule.forRoot(),HttpClientModule
  ],
  providers: [MapService, MessageService, IndicadoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
