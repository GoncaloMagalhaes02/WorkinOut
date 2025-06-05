import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GetprofileService } from 'src/services/getprofile.service';

@Component({
  selector: 'app-editperfil',
  templateUrl: './editperfil.page.html',
  styleUrls: ['./editperfil.page.scss'],
  standalone: false,
})
export class EditperfilPage implements OnInit {
  formularioEdit: FormGroup;
  utilizador: any = {};

  constructor(
    private fb: FormBuilder,
    private user: GetprofileService,
    private http: HttpClient,
    private toastController: ToastController,
    private router: Router
  ) {
    this.formularioEdit = this.fb.group({
      name: [''],
      height: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(1)]],
      age: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.user.getUserProfile().subscribe({
      next: (user) => {
        this.utilizador = user;

        // Preenche os campos do formulário com os dados do utilizador
        this.formularioEdit.patchValue({
          name: user.name,
          email: user.email,
          height: user.height,
          weight: user.weight,
          age: user.age,
        });
      },
      error: (err) => {
        console.error('Erro ao buscar utilizador', err);
      },
    });
  }

  carregarPerfil() {
    this.user.getUserProfile().subscribe({
      next: (user) => {
        this.utilizador = user;
      },
      error: (err) => {
        console.error('Erro ao buscar utilizador', err);
      },
    });
  }

  isInvalid(controlName: string): boolean {
    const c = this.formularioEdit.get(controlName);
    return !!(c && c.invalid && (c.touched || c.dirty));
  }

  salvar() {
    this.formularioEdit.markAllAsTouched();

    if (this.formularioEdit.invalid) {
      return;
    }

    //Pega os valores atualizados do formulário:
    const dadosParaEnviar = this.formularioEdit.value;
    console.log('Enviando para API:', dadosParaEnviar);

    //Configura headers se precisar de autenticação:
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    //Chama seu endpoint REST
    this.http
      .post('http://localhost:3000/users/atualizaUser', dadosParaEnviar, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .subscribe({
        next: async (res) => {
          const toast = await this.toastController.create({
            message: 'Perfil atualizado!',
            duration: 2000,
            color: 'success',
          });

          await toast.present();

          // Redireciona após o toast desaparecer
          setTimeout(() => {
            this.router.navigate(['/tabs/tab3'], {
              state: { user: res }, // <-- dados atualizados
            });
          }, 2000);
        },
        error: async (err) => {
          const toast = await this.toastController.create({
            message: 'Erro ao atualizar!',
            duration: 2000,
            color: 'danger',
          });

          await toast.present();
        },
      });
  }
}
