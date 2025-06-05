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
}
