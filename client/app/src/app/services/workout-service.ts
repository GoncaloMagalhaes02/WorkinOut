import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class WorkoutService {
    private apiUrl = 'http://localhost:3000/exercises';

    constructor(private http: HttpClient) { }

    createWorkoutPlan(data: { name: string; description?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/createWorkoutPlan`, data);
  }

  createExercise(data: { name: string; description?: string }): Observable<any> {
  return this.http.post('http://localhost:3000/exercises/createExercise', data);
}

getAllPlans(): Observable<any> {
  return this.http.get(`${this.apiUrl}/getAllWorkoutPlans`);
}

getWorkoutPlanById(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/getWorkoutPlanExercises/${id}`);
}

addExerciseToPlan(workoutPlanId: number, exerciseId: number): Observable<any> {
  return this.http.post('http://localhost:3000/exercises/addExercisePlan', {
    workoutPlanId,
    exerciseId
  });
}

deleteWorkoutPlan(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/deleteWorkoutPlan/${id}`);
}  

getAllExercises(): Observable<any> {
  return this.http.get('http://localhost:3000/exercises/getAllExercises');
}

}
