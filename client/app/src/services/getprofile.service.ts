import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class GetprofileService {
  private apiUrl = 'http://localhost:3000/users/getUserProfile';

  constructor(private http: HttpClient, private navCtrl: NavController) {}

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/me`, { headers });
  }

  logout() {
    localStorage.removeItem('token');
    this.navCtrl.navigateRoot('/login'); // aqui usa NavController
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
