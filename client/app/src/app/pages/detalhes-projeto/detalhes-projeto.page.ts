import { Component, OnInit } from '@angular/core';
import { ProjectosService } from 'src/app/services/projectos-service';
import { GetprofileService } from 'src/services/getprofile.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalhes-projeto',
  templateUrl: './detalhes-projeto.page.html',
  styleUrls: ['./detalhes-projeto.page.scss'],
  standalone: false,
})
export class DetalhesProjetoPage implements OnInit {
  constructor(
    private projectosService: ProjectosService,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private formModule: FormsModule,
  ) {}

  projeto: any;


  ngOnInit() {
    this.carregarProjeto();
  }

  carregarProjeto() {
    const idString = this.route.snapshot.paramMap.get('id');
    const id = idString ? +idString : null;
    if (id !== null) {
      this.projectosService.getProjectsbyId(id).subscribe({
        next: (projeto) => {
          this.projeto = projeto[0];
          console.log(projeto);
        },
        error: (err) => {
          console.error('Erro ao buscar projeto:', err);
        },
      });
    } else {
      console.error('ID do projeto inválido');
    }
  }

  updateStatus(status: string) {
    if (this.projeto && this.projeto.id) {
      this.projectosService.updateStatusProject(this.projeto.id, status).subscribe({
        next: (response) => {
          console.log('Status atualizado com sucesso:', response);
          this.projeto.status = status; // Atualiza o status localmente

          this.ToastSuccess('Status atualizado com sucesso!');
          //ir para a /tabs/projetos
          setTimeout(() => {
            window.location.href = '/tabs/projetos';
          }, 1000); // Redireciona após 2 segundos

        },
        error: (err) => {
          console.error('Erro ao atualizar status:', err);
          this.ToastError('Erro ao atualizar status');  
        },
      });
    } else {
      console.error('Projeto ou ID do projeto não encontrado');
    }
  }

  async ToastSuccess(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }

  async ToastError(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'danger',
    });
    toast.present();
  }
}
