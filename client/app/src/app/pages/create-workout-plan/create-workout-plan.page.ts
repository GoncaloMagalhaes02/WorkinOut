import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-create-workout-plan',
  standalone: true,
  templateUrl: './create-workout-plan.page.html',
  styleUrls: ['./create-workout-plan.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateWorkoutPlanPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
