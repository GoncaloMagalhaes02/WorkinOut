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
  formularioLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {
    this.formularioLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/tabs/tab1']);
    }
  }

  async loginUser() {
    if (this.formularioLogin.valid) {
      const dados = this.formularioLogin.value;
      this.http
        .post<{ token: string; user: any }>(
          'http://localhost:3000/users/login',
          dados
        )
        .subscribe({
          next: async (response) => {
            console.log('Login bem-sucedido', response);
            await this.toastSuccess();
            localStorage.setItem('token', response.token); // salva o token no localStorage
            this.router.navigate(['/tabs/tab1']);
          },
          error: async (error) => {
            console.error('Erro ao fazer login', error);
            await this.toastError();
          },
        });
    }
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