import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  formularioRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {
    this.formularioRegister = this.fb.group({
      name: ['', Validators.required],
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

  async registerUser() {
    if (this.formularioRegister.valid) {
      const dados = this.formularioRegister.value;
      console.log(dados);
      this.http.post('http://localhost:3000/users/register', dados).subscribe({
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
