import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';
import { VehiculoModule } from 'src/app/componentes/vehiculo/vehiculo.module';
import { Routes, RouterModule } from '@angular/router';

export const ruta: Routes = [

  {
    path: '',
    component: UsuarioComponent,
  }

];
@NgModule({
  declarations: [UsuarioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ruta),
    VehiculoModule
  ]
})
export class UsuarioModule { }
