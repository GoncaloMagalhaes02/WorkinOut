import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InseredadosPage } from './inseredados.page';

const routes: Routes = [
  {
    path: '',
    component: InseredadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InseredadosPageRoutingModule {}
