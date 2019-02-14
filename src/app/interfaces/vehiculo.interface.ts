import { Propietario } from './propietario.interface';

export interface Vehiculo {
    tipo?: string;
    marca?: string;
    color?: string;
    placa?: string;
    km?: string;
    tiempoUso?: string;
    motor?: string;
    propietario?: Propietario;
}
