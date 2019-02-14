import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { AppRoutingModule } from './inicio-routing.module';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    LoginModule
  ]
})
export class InicioModule { }
