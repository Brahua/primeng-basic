import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { VehiculoModule } from 'src/app/componentes/vehiculo/vehiculo.module';
import { Routes, RouterModule } from '@angular/router';

export const ruta: Routes = [

  {
    path: '',
    component: AdminComponent,
  }

];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ruta),
    VehiculoModule
  ]
})
export class AdminModule { }
