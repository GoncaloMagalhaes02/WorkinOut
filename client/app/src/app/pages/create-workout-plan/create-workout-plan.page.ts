import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { WorkoutService } from 'src/app/services/workout-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-workout-plan',
  standalone: true,
  templateUrl: './create-workout-plan.page.html',
  styleUrls: ['./create-workout-plan.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CreateWorkoutPlanPage implements OnInit {

  createWorkoutPlanForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.createWorkoutPlanForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {}

  createWorkoutPlan() {
    if (this.createWorkoutPlanForm.valid) {
      const plano = this.createWorkoutPlanForm.value;

      this.workoutService.createWorkoutPlan(plano).subscribe({
        next: async () => {
          await this.toastSucess();
          this.router.navigate(['/tabs/tab1']); // Ou onde quiseres redirecionar
        },
        error: async () => {
          await this.toastError();
        }
      });
    }
  }

  toastSucess() {
    return this.toastController.create({
      message: 'Plano de treino criado com sucesso!',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    }).then(toast => toast.present());
  }

  toastError() {
    return this.toastController.create({
      message: 'Erro ao criar o plano de treino.',
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    }).then(toast => toast.present());
  }
}
