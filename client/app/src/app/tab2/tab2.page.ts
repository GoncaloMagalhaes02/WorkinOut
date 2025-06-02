import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { WorkoutService } from '../services/workout-service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {


  workoutPlans: any[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private workoutService: WorkoutService ) {}

  ngOnInit() {
    this.loadWorkoutPlans();
  }
  
  loadWorkoutPlans() {
    this.workoutService.getAllPlans().subscribe({
      next: (plans) => {
        this.workoutPlans = plans;
      },
      error: (error) => {
        console.error('Error loading workout plans:', error);
      }
    }  
    );
  }




}
