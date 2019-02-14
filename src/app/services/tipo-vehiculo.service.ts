import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { TipoVehiculo } from '../interfaces/tipo-vehiculo.interface';

@Injectable()
export class TipoVehiculoService {

  private TIPOS: TipoVehiculo[] = [
    { id: 1, nombre: 'MOTO'},
    { id: 2, nombre: 'CAMION'},
    { id: 3, nombre: 'CARRO'},
  ];

  constructor() {}

  getTipoVehiculos(): Observable<TipoVehiculo[]> {
    return of(this.TIPOS);
  }
}
