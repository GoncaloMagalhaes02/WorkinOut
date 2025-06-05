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
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {
    this.formularioRegister = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]+@[A-Za-z]+\\.[A-Za-z]{2,}$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/tabs/tab1']);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async registerUser() {
    if (this.formularioRegister.valid) {
      const formValues = this.formularioRegister.value;
      const formData = new FormData();

      formData.append('name', formValues.name);
      formData.append('email', formValues.email);
      formData.append('password', formValues.password);

      if (this.selectedFile) {
        formData.append('photo', this.selectedFile);
      }

      this.http
        .post('http://localhost:3000/users/register', formData)
        .subscribe({
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

  getError(controlName: string, errorType: string): boolean {
    const control = this.formularioRegister.get(controlName);
    return !!(control && control.hasError(errorType));
  }

  isTouchedOrDirty(controlName: string): boolean {
    const control = this.formularioRegister.get(controlName);
    return !!(control && (control.touched || control.dirty));
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
