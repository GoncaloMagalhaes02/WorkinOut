import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjetoEvolucaoPage } from './projeto-evolucao.page';

const routes: Routes = [
  {
    path: '',
    component: ProjetoEvolucaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjetoEvolucaoPageRoutingModule {}
