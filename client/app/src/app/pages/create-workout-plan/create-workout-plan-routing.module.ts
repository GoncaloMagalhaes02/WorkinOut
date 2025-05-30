import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateWorkoutPlanPage } from './create-workout-plan.page';

const routes: Routes = [
  {
    path: '',
    component: CreateWorkoutPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateWorkoutPlanPageRoutingModule {}
