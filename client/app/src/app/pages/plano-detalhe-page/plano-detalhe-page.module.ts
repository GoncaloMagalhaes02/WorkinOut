import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanoDetalhePagePageRoutingModule } from './plano-detalhe-page-routing.module';

import { PlanoDetalhePagePage } from './plano-detalhe-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanoDetalhePagePageRoutingModule
  ],
  declarations: [PlanoDetalhePagePage]
})
export class PlanoDetalhePagePageModule {}
