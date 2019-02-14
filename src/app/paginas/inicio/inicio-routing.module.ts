import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardia } from 'src/app/guardias/auth-guardia';
import { VerificacionGuardia } from 'src/app/guardias/verificacion-guardia';
import { AdminGuardia } from 'src/app/guardias/admin-guardia';
import { UsuarioGuardia } from 'src/app/guardias/usuario-guardia';

export const rutaInicial: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    canActivate: [VerificacionGuardia]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthGuardia, AdminGuardia]
  },
  {
    path: 'usuario',
    loadChildren: './usuario/usuario.module#UsuarioModule',
    canActivate: [AuthGuardia, UsuarioGuardia]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(rutaInicial)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuardia, VerificacionGuardia, AdminGuardia, UsuarioGuardia]
})
export class AppRoutingModule { }
