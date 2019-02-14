import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  usuario: Usuario = {};

  msgs: Message[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  private validarLogin() {
    const caracteres = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let validado = false;
    let mensaje = '';

    // tslint:disable-next-line:max-line-length
    if (this.usuario.correo === undefined ||  this.usuario.correo.trim() === '') {
      mensaje = 'Usuario vacío';
    } else if (!caracteres.test(this.usuario.correo)) {
      mensaje = 'Por favor, ingrese un correo válido';
    } else if (this.usuario.contrasena === undefined || this.usuario.contrasena.trim() === '') {
      mensaje = 'Contraseña vacía';
    } else if (this.usuario.contrasena.length < 10) {
      mensaje = 'La contraseña debe tener al menos 10 caracteres.';
    }

    if (mensaje) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: '¡Error!', detail: mensaje });
    } else {
      this.msgs = [];
      validado = true;
    }

    return validado;
  }

  ingresar() {
    let error = false;

    if (this.validarLogin()) {
      this.usuarioService.iniciarSesion(this.usuario).subscribe(u => {
        if (!u) {
          error = true;
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: '¡Error!', detail: 'Credenciales inválidas' });
        }
      });
    }
  }

}
