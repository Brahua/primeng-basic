import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { InicioComponent } from './paginas/inicio/inicio.component';
import { InicioModule } from './paginas/inicio/inicio.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InicioModule
  ],
  providers: [],
  bootstrap: [InicioComponent]
})
export class AppModule { }
