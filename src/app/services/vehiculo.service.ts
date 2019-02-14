import { Injectable } from '@angular/core';
import { Vehiculo } from '../interfaces/vehiculo.interface';
import { of, Observable } from 'rxjs';
import { TipoVehiculo } from '../interfaces/tipo-vehiculo.interface';
import { Propietario } from '../interfaces/propietario.interface';

@Injectable()
export class VehiculoService {

  private VEHICULOS: Vehiculo[] = [
    {
      tipo: 'MOTO',
      marca: 'Hyundai',
      color: 'Rojo',
      placa: 'ADAF55',
      propietario: {
        nombre: 'Josue',
        dni: 72251322,
        licencia: 'A1'
      }
    },
    {
      tipo: 'CAMION',
      marca: 'Hyundai',
      color: 'Rojo',
      placa: 'ADAF55',
      propietario: {
        nombre: 'Josue',
        dni: 72251322,
        licencia: 'A1'
      }
    },
    {
      tipo: 'CARRO',
      marca: 'Hyundai',
      color: 'Rojo',
      placa: 'ADAF55',
      propietario: {
        nombre: 'Josue',
        dni: 72251322,
        licencia: 'A1'
      }
    }
  ];

  constructor() {}

  getVehiculos(): Observable<Vehiculo[]> {
    return of(this.VEHICULOS);
  }

  guardarVehiculo(vehiculo: Vehiculo, tipoVehiculoSeleccionado: TipoVehiculo, propietario: Propietario): Observable<boolean> {
    vehiculo.tipo = tipoVehiculoSeleccionado.nombre;
    vehiculo.propietario = propietario;
    this.VEHICULOS.push(vehiculo);
    return of(true);
  }

  editarVehiculo(index: number, vehiculo: Vehiculo, tipoVehiculoSeleccionado: TipoVehiculo, propietario: Propietario): Observable<boolean> {
    this.VEHICULOS[index] = vehiculo;
    this.VEHICULOS[index].tipo = tipoVehiculoSeleccionado.nombre;
    this.VEHICULOS[index].propietario = propietario;
    return of(true);
  }

  eliminarVehiculo(index: number): Observable<boolean> {
    this.VEHICULOS.splice(index, 1);
    return of(true);
  }

}
