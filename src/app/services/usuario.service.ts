import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import {of, Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

    private USUARIOS: Usuario[] = [
        {
            id: 1,
            correo: 'admin@solmit.net',
            contrasena: '1234567890',
            nombre: 'Josue',
            rol: 'Administrador',
        },
        {
            id: 2,
            correo: 'usuario@solmit.net',
            contrasena: '1234567890',
            nombre: 'Alex',
            rol: 'Usuario',
        }
    ];

    constructor(private router: Router) { }

    iniciarSesion(usuario: Usuario): Observable<Usuario> {

        for (const u of this.USUARIOS) {
            if (usuario.correo === u.correo && usuario.contrasena === u.contrasena) {
                localStorage.setItem('usuario', JSON.stringify(u));
                this.redireccionar(u);
                return of(u);
            }
        }
        return of(null);

    }

    redireccionar(usuario: Usuario) {
        if (usuario.rol === 'Administrador') {
            this.router.navigate(['admin']);
        } else {
            this.router.navigate(['usuario']);
        }
    }

}
