import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InseredadosPageRoutingModule } from './inseredados-routing.module';

import { InseredadosPage } from './inseredados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InseredadosPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [InseredadosPage],
})
export class InseredadosPageModule {}
