import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { Vehiculo } from 'src/app/interfaces/vehiculo.interface';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';
import { Propietario } from 'src/app/interfaces/propietario.interface';
import { TipoVehiculoService } from 'src/app/services/tipo-vehiculo.service';
import { TipoVehiculo } from 'src/app/interfaces/tipo-vehiculo.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class VehiculoComponent implements OnInit {
  // Usuario loggeado
  usuario: Usuario;

  editar: boolean;
  index: number;
  // Atributo para verificar si el usuario es Administrador
  @Input() mostrarPrivilegios = false;
  // Lista inicial de Vehiculos
  listaVehiculos: Vehiculo[] = [];
  // Objeto temporal de Vehiculo
  temporalVehiculo: Vehiculo = { propietario: {} };
  // Objeto temporal de Propietario
  temporalPropietario: Propietario = {};
  // Arreglo de los tipos de vehiculos
  tipoVehiculos: TipoVehiculo[] = [];
  // Tipo de vehiculo seleccionado del arreglo anterior
  tipoVehiculoSeleccionado: TipoVehiculo = {};
  // Atributo para almacenar los mensajes emergentes
  msgs: Message[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private vehiculoService: VehiculoService,
    private tipoVehiculoService: TipoVehiculoService,
    private router: Router
  ) {
    // Ejecución del servicio 'VehiculoService' para rellenar la lista inicial de vehiculos
    this.vehiculoService.getVehiculos().subscribe(respuesta => {
      this.listaVehiculos = respuesta;
    });
    // Ejecución del servicio 'TipoVehiculoService' para rellenar la lista inicial de los tipos de vehiculos
    this.tipoVehiculoService.getTipoVehiculos().subscribe(respuesta => {
      this.tipoVehiculos = respuesta;
    });

    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  ngOnInit() {}

  limpiar() {
    this.editar = false;
    this.temporalVehiculo = {};
    this.temporalPropietario = {};
    this.tipoVehiculoSeleccionado = {};
  }

  // Metodo para cerrar sesión
  salir() {
    this.confirmationService.confirm({
      header: 'Salir del sistema',
      icon: 'pi pi-exclamation-triangle',
      message: '¿Seguro que quiere cerrar sesión?',
      accept: () => {
        localStorage.clear();
        this.router.navigate(['login']);
      }
    });
  }

  // Método para validar los campos del formulario de registro de vehiculos
  private validacionVehiculo() {
    let validado = false;
    let mensaje = '';

    if (this.tipoVehiculoSeleccionado.nombre === undefined) {
      mensaje = 'Ingrese el tipo';
    } else if (
      this.temporalVehiculo.marca === undefined ||
      this.temporalVehiculo.marca.trim() === ''
    ) {
      mensaje = 'Ingrese la marca';
    } else if (
      this.temporalVehiculo.color === undefined ||
      this.temporalVehiculo.color.trim() === ''
    ) {
      mensaje = 'Ingrese el color';
    } else if (
      this.temporalVehiculo.placa === undefined ||
      this.temporalVehiculo.placa.trim() === ''
    ) {
      mensaje = 'Ingrese la placa';
    }

    if (mensaje) {
      this.msgs.push({ severity: 'warn', summary: 'Aviso!', detail: mensaje });
    } else {
      validado = true;
    }

    return validado;
  }

  // Método para validar los campos del formulario de registro de propietario
  private validacionPropietario() {
    let validado = false;
    let mensaje = '';

    if (
      this.temporalPropietario.nombre === undefined ||
      this.temporalPropietario.nombre.trim() === ''
    ) {
      mensaje = 'Ingrese el nombre del propietario';
    } else if (this.temporalPropietario.dni === undefined) {
      mensaje = 'Ingrese el dni del propietario';
    } else if (
      this.temporalPropietario.licencia === undefined ||
      this.temporalPropietario.licencia.trim() === ''
    ) {
      mensaje = 'Ingrese la licencia del propietario';
    }

    if (mensaje) {
      this.msgs = [];
      this.msgs.push({ severity: 'warn', summary: 'Aviso!', detail: mensaje });
    } else {
      validado = true;
    }

    return validado;
  }

  // Método para guardar información de los vehiculos con sus propietarios
  clickGuardar() {
    if (this.validacionVehiculo() && this.validacionPropietario()) {
      if (this.editar) {
        // tslint:disable-next-line:max-line-length
        this.vehiculoService
          .editarVehiculo(
            this.index,
            this.temporalVehiculo,
            this.tipoVehiculoSeleccionado,
            this.temporalPropietario
          )
          .subscribe(response => {
            this.msgs.push({
              severity: 'success',
              summary: 'Editado!',
              detail: 'Se editó correctamente el registro del vehiculo.'
            });
            this.limpiar();
          });
      } else {
        // tslint:disable-next-line:max-line-length
        this.vehiculoService
          .guardarVehiculo(
            this.temporalVehiculo,
            this.tipoVehiculoSeleccionado,
            this.temporalPropietario
          )
          .subscribe(response => {
            this.msgs.push({
              severity: 'success',
              summary: 'Guardado!',
              detail: 'Se agregó correctamente el registro del vehiculo.'
            });
            this.limpiar();
          });
      }
    }
  }

  // Método para eliminar información de los vehiculos con sus propietarios
  onClickEliminar(i: number) {
    this.msgs = [];
    this.confirmationService.confirm({
      header: 'Eliminar registro',
      icon: 'pi pi-info-circle',
      message: '¿Seguro que quiere eliminar el registro seleccionado?',
      accept: () => {
        this.vehiculoService.eliminarVehiculo(i).subscribe(response => {
          this.msgs.push({
            severity: 'success',
            summary: 'Eliminado!',
            detail: 'Se eliminó correctamente el registro del vehiculo.'
          });
          this.limpiar();
        });
      }
    });
  }

  // Método para editar información de los vehiculos con sus propietarios
  onClickEditar(vehiculo: Vehiculo, i: number) {
    this.msgs = [];
    this.editar = true;
    this.index = i;

    this.temporalVehiculo = this.clonar(vehiculo);

    for (const tv of this.tipoVehiculos) {
      if (tv.nombre === this.temporalVehiculo.tipo) {
        this.tipoVehiculoSeleccionado = tv;
      }
    }

    this.temporalPropietario = this.clonar(this.temporalVehiculo.propietario);
  }

  // Metodos de apoyo
  public clonar(objeto: any): any {
    const r: any = {};
    if (objeto == null) {
      return null;
    }
    for (const prop in objeto) {
      if (objeto[prop] != null && objeto[prop] instanceof Array) {
        const lista: any = objeto[prop];
        if (lista.length === 0) {
          r[prop] = [];
        }
        if (lista.length > 0) {
          if (typeof lista[0] === 'string' || typeof lista[0] === 'number') {
            r[prop] = lista;
          } else {
            r[prop] = this.clonar_lista(objeto[prop]);
          }
        }
      } else {
        r[prop] = objeto[prop];
      }
      // r[prop] = this.clonar(objeto[prop]);
    }
    return r;
  }

  public clonar_lista(lista: any): any {
    const r: any = [];
    lista.forEach(element => {
      const re = this.clonar(element);
      r.push(re);
    });
    return r;
  }
}
