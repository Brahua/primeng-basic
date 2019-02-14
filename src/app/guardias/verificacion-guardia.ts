import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

@Injectable()
export class VerificacionGuardia implements CanActivate {

    constructor(private router: Router) { }

    // Guardia para redireccionar al usuario loggeado
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if(usuario) {
            if (usuario.rol === 'Administrador') {
                this.router.navigate(['admin']);
                return false;
            } else if (usuario.rol === 'Usuario') {
                this.router.navigate(['usuario']);
                return false;
            }
        } else {
            return true;
        }
    }
}
