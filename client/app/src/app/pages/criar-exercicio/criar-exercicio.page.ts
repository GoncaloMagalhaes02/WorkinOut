import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WorkoutService } from 'src/app/services/workout-service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-criar-exercicio',
  standalone: true,
  templateUrl: './criar-exercicio.page.html',
  styleUrls: ['./criar-exercicio.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class CriarExercicioPage implements OnInit {

  createExerciseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.createExerciseForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  createExercise() {
    if (this.createExerciseForm.valid) {
      const exercise = this.createExerciseForm.value;

      this.workoutService.createExercise(exercise).subscribe({
        next: async () => {
          await this.toastSuccess();
          this.router.navigate(['/tabs/tab2']); 
        },
        error: async () => {
          await this.toastError();
        }
      });
    }
  }

  toastSuccess() {
    return this.toastController.create({
      message: 'Exercício criado com sucesso!',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    }).then(toast => toast.present());
  }

  toastError() {
    return this.toastController.create({
      message: 'Erro ao criar exercício.',
      duration: 2000,
      position: 'bottom',
      color: 'danger',
    }).then(toast => toast.present());
  }
}