import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjetoEvolucaoPageRoutingModule } from './projeto-evolucao-routing.module';

import { ProjetoEvolucaoPage } from './projeto-evolucao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjetoEvolucaoPageRoutingModule
  ],
  declarations: [ProjetoEvolucaoPage]
})
export class ProjetoEvolucaoPageModule {}
