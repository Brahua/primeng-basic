import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

export const ruta: Routes = [

  {
    path: '',
    component: LoginComponent,
  }

];
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ruta),
    FormsModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    MessagesModule
  ],
  providers: [
    UsuarioService
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
