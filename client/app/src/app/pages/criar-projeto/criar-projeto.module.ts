import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarProjetoPageRoutingModule } from './criar-projeto-routing.module';

import { CriarProjetoPage } from './criar-projeto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarProjetoPageRoutingModule
  ],
  declarations: [CriarProjetoPage]
})
export class CriarProjetoPageModule {}
