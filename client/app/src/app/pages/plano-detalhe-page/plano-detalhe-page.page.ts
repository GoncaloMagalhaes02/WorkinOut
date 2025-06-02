import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../../services/workout-service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plano-detalhe-page',
  standalone: false,
  templateUrl: './plano-detalhe-page.page.html',
  styleUrls: ['./plano-detalhe-page.page.scss'],
})
export class PlanoDetalhePagePage implements OnInit {

  planId!: number;
  exercises: any[] = [];
  allExercises: any[] = [];
  selectedExerciseId: number | null = null;

  workoutPlanName = '';
  workoutPlanDescription = '';

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private toastController: ToastController,
    private router: Router
    
  ) {}

   ngOnInit() {
    this.planId = +this.route.snapshot.paramMap.get('id')!;
    this.loadExercises();
    this.loadAllExercises();
  }

  loadExercises() {
    this.workoutService.getWorkoutPlanById(this.planId).subscribe({
      next: (data) => {
        this.exercises = data;

        if (this.exercises.length > 0) {
          this.workoutPlanName = this.exercises[0].workoutPlan.name;
          this.workoutPlanDescription = this.exercises[0].workoutPlan.description || 'Sem descrição';
        } else {
          this.workoutService.getAllPlans().subscribe({
            next: (plans) => {
              const plan = plans.find((p: any) => p.id === this.planId);
              if (plan) {
                this.workoutPlanName = plan.name;
                this.workoutPlanDescription = plan.description || 'Sem descrição';
              }
            }
          });
        }
      },
      error: (err) => console.error('Erro ao buscar exercícios:', err)
    });
  }

  loadAllExercises() {
    this.workoutService.getAllExercises().subscribe({
      next: (data) => this.allExercises = data,
      error: (err) => console.error('Erro ao carregar todos os exercícios:', err)
    });
  }

  associateExercise() {
    if (!this.selectedExerciseId) return;

    this.workoutService.addExerciseToPlan(this.planId, this.selectedExerciseId).subscribe({
      next: async () => {
        this.selectedExerciseId = null;
        this.loadExercises(); // Atualiza lista
        const toast = await this.toastController.create({
          message: 'Exercício associado com sucesso!',
          duration: 2000,
          color: 'success',
          position: 'bottom'
        });
        toast.present();
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: 'Erro ao associar exercício.',
          duration: 2000,
          color: 'danger',
          position: 'bottom'
        });
        toast.present();
      }
    });
  }

  deleteWorkoutPlan(){
    this.workoutService.deleteWorkoutPlan(this.planId).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Plano de treino excluído com sucesso!',
          duration: 2000,
          color: 'success',
          position: 'bottom'
        });
        toast.present();
        this.router.navigate(['/tabs/tab2']);
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: 'Erro ao excluir plano de treino.',
          duration: 2000,
          color: 'danger',
          position: 'bottom'
        });
        toast.present();
      }
    });
  }
}
