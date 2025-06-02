import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanoDetalhePagePage } from './plano-detalhe-page.page';

const routes: Routes = [
  {
    path: '',
    component: PlanoDetalhePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanoDetalhePagePageRoutingModule {}
