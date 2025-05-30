import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  name: string = '';
  password: string = '';



  constructor( private http: HttpClient, private router: Router, private toastController: ToastController) {}

  ngOnInit() {}

  async loginUser() {
    const formData = {
      name: this.name,
      password: this.password,
    };

    this.http.post('http://localhost:3000/users/login', formData).subscribe({
      next: async (response) => {
        console.log('Login bem-sucedido', response);
        await this.toastSuccess();
        this.router.navigate(['/home']);
      },
      error: async (error) => {
        console.error('Erro ao fazer login', error);
        await this.toastError();
      },
    });
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Login bem-sucedido',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Erro ao fazer login',
      duration: 2000,
      position: 'bottom',
      color: 'danger',
    });
    toast.present();
  }
}
