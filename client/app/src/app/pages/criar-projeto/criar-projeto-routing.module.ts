import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarProjetoPage } from './criar-projeto.page';

const routes: Routes = [
  {
    path: '',
    component: CriarProjetoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarProjetoPageRoutingModule {}
