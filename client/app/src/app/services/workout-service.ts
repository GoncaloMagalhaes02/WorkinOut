import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private url = 'http://localhost:3000'; // Ajusta se for diferente

  constructor(private http: HttpClient) {}

  getExercisesByWorkoutPlanId(planId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/exercises/getWorkoutPlanExercises/${planId}`);
  }
}
