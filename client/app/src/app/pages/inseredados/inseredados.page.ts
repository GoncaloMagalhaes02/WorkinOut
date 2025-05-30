import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-inseredados',
  templateUrl: './inseredados.page.html',
  styleUrls: ['./inseredados.page.scss'],
  standalone: false,
})
export class InseredadosPage implements OnInit {
  meuFormulario: FormGroup;
  apiUrl = 'https://suaapi.com/endpoint';
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.meuFormulario = this.fb.group({
      peso: ['', Validators.required],
      nascimento: ['', Validators.required],
      altura: ['', Validators.required],
      sexo: ['', Validators.required],
    });
  }

  enviarFormulario() {
    if (this.meuFormulario.valid) {
      const dados = this.meuFormulario.value;
      console.log('Dados do formulário:', dados);

      // Aqui você pode enviar para sua API
      // this.http.post('URL_API', dados).subscribe(...)
    } else {
      this.meuFormulario.markAllAsTouched();
      console.warn('Formulário inválido');
    }
  }

  ngOnInit() {}
}
