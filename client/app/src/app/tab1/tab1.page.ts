import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
