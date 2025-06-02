import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarExercicioPageRoutingModule } from './criar-exercicio-routing.module';

import { CriarExercicioPage } from './criar-exercicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarExercicioPageRoutingModule,
    CriarExercicioPage
  ],
  declarations: []
})
export class CriarExercicioPageModule {}
