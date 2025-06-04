import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ProjectosService } from 'src/app/services/projectos-service';
import { GetprofileService } from 'src/services/getprofile.service';

@Component({
  selector: 'app-criar-projeto',
  standalone: false,
  templateUrl: './criar-projeto.page.html',
  styleUrls: ['./criar-projeto.page.scss'],
})
export class CriarProjetoPage implements OnInit {

  project = {
    name: '',
    description: '',
    data_inicio: '',
    data_fim: '',
    peso_inicial: null,
    peso_final: null,
    user_id: null,
  };

  constructor(
    private projectosService: ProjectosService,
    private getProfileService: GetprofileService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    // Carregar o perfil do utilizador para obter o ID
    this.getProfileService.getUserProfile().subscribe({
      next: (user) => {
        this.project.user_id = user.id;
      },
      error: (err) => {
        console.error('Erro ao buscar perfil:', err);
      }
    });
  }

  async onSubmit() {
    // Validação básica
    if (
      !this.project.name ||
      !this.project.data_inicio ||
      !this.project.data_fim ||
      this.project.peso_inicial === null ||
      this.project.peso_final === null
    ) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, preencha todos os campos obrigatórios.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    this.projectosService.createProject(this.project).subscribe({
      next: async (response) => {
        const toast = await this.toastCtrl.create({
          message: 'Projeto criado com sucesso!',
          duration: 2000,
          color: 'success',
        });
        await toast.present();
        this.navCtrl.navigateBack('/tabs/projetos'); // ajusta a rota conforme o nome da tua página de projetos
      },
      error: async (error) => {
        console.error('Erro ao criar projeto:', error);
        const toast = await this.toastCtrl.create({
          //mensagem de erro do backend
           message: error.error.message || 'Erro ao criar projeto. Tente novamente.',
          duration: 2000,
          color: 'danger',
        });
        await toast.present();
      },
    });
  }
}
