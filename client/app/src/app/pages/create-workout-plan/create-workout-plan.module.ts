import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateWorkoutPlanPageRoutingModule } from './create-workout-plan-routing.module';

import { CreateWorkoutPlanPage } from './create-workout-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateWorkoutPlanPageRoutingModule,
    CreateWorkoutPlanPage
  ],
  declarations: []
})
export class CreateWorkoutPlanPageModule {}
