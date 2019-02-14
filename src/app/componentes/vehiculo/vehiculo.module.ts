import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VehiculoComponent } from './vehiculo.component';
import { FormsModule } from '@angular/forms';
// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import { DataTableModule } from 'primeng/datatable';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import {ListboxModule} from 'primeng/listbox';
import { TipoVehiculoService } from 'src/app/services/tipo-vehiculo.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [VehiculoComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    CardModule,
    TableModule,
    DataTableModule,
    DialogModule,
    MessagesModule,
    MessageModule,
    ListboxModule,
    ConfirmDialogModule
  ],
  providers: [
    VehiculoService,
    TipoVehiculoService
  ],
  exports: [VehiculoComponent]
})
export class VehiculoModule { }
