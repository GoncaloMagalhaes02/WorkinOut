import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarExercicioPage } from './criar-exercicio.page';

const routes: Routes = [
  {
    path: '',
    component: CriarExercicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarExercicioPageRoutingModule {}
