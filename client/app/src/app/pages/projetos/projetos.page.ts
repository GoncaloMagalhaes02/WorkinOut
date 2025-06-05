import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectosService } from '../../services/projectos-service';
import { GetprofileService } from 'src/services/getprofile.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-projetos',
  standalone: false,
  templateUrl: './projetos.page.html',
  styleUrls: ['./projetos.page.scss'],
})
export class ProjetosPage implements OnInit {
  projetos: any[] = [];
  id!: number;

  constructor(
    private projectosService: ProjectosService,
    private getProfileService: GetprofileService,
    private toastControler: ToastController,
    private alertControler: AlertController
  ) {}

  ngOnInit() {
    this.getProfileService.getUserProfile().subscribe({
      next: (user) => {
        this.id = user.id;
        this.carregarProjetos();
      },
      error: (err) => {
        console.error('Erro ao buscar perfil:', err);
      },
    });
  }

  carregarProjetos() {
    this.projectosService.getProjectsbyUserId(this.id).subscribe({
      next: (data) => {
        this.projetos = data;
      },
      error: (err) => {
        console.error('Erro ao buscar projetos:', err);
        this.projetos = [];
      },
    });
  }

  async deleteProject(id: number) {
    const alert = await this.alertControler.create({
      header: 'Confirmar',
      message: 'Tens a certeza que queres apagar este projeto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Apagar',
          role: 'destructive',
          handler: () => {
            this.projectosService.deleteProject(id).subscribe({
              next: async () => {
                const toast = await this.toastControler.create({
                  message: 'Projeto excluído com sucesso!',
                  duration: 2000,
                  color: 'success',
                  position: 'bottom',
                });
                toast.present();
              },
              error: async () => {
                const toast = await this.toastControler.create({
                  message: 'Erro ao excluir o projeto.',
                  duration: 2000,
                  color: 'danger',
                  position: 'bottom',
                });
                toast.present();
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }
}
