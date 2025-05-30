import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth-service.service';
import { GetprofileService } from 'src/services/getprofile.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  utilizador: any = {};

  constructor(
    private authService: AuthService,
    private profile: GetprofileService
  ) {}

  ngOnInit() {
    this.profile.getUserProfile().subscribe({
      next: (user) => {
        this.utilizador = user;
      },
      error: (err) => {
        console.error('Erro ao buscar utilizador', err);
      },
    });
  }

  logout() {
    this.authService.logout();
  }
}
