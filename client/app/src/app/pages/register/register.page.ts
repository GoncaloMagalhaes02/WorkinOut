import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  email: string = '';
  name: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Inicializações se precisares
  }

  async registerUser() {
    const formData = {
      email: this.email,
      name: this.name,
      password: this.password,
    };

    this.http.post('http://localhost:3000/users/register', formData).subscribe({
      next: async (response) => {
        console.log('Utilizador registado com sucesso', response);
        await this.toastSuccess();
        this.router.navigate(['/login']);
      },
      error: async (error) => {
        console.error('Erro ao criar a conta', error);
        await this.toastError();
      },
    });
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Utilizador registado com sucesso',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Erro ao criar a conta',
      duration: 2000,
      position: 'bottom',
      color: 'danger',
    });
    toast.present();
  }
}
