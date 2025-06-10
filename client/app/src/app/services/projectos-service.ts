import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectosService {
  private apiUrl = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {}

  getProjectsbyUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getProjectsbyUser/${userId}`);
  }

  createProject(project: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createProject`, project);
  }

  getProjectsbyId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getProjectsbyID/${id}`);
  }
    
  createProjectEvolution(projectId: number, formData: FormData): Observable<any> {
        return this.http.post(`${this.apiUrl}/createProgressTrack/${projectId}`, formData);
    }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteProject/${id}`);
  }

  updateStatusProject(projectId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateStatus/${projectId}`, { status });
  }

  getProjectEvolutions(projectId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getProgressByProject/${projectId}`);
  }

}