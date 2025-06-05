import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditperfilPageRoutingModule } from './editperfil-routing.module';

import { EditperfilPage } from './editperfil.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditperfilPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EditperfilPage]
})
export class EditperfilPageModule {}
