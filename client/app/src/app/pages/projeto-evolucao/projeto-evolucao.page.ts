import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetprofileService } from 'src/services/getprofile.service';
import { ProjectosService } from 'src/app/services/projectos-service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projeto-evolucao',
  standalone: false,
  templateUrl: './projeto-evolucao.page.html',
  styleUrls: ['./projeto-evolucao.page.scss'],
})
export class ProjetoEvolucaoPage implements OnInit {
  semanaAtual!: number;
  pesoAtual!: number;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  userId!: number;
  projectId!: number; 
  data_taken!: Date;

  projectEvolutions: any[] = []; // Array para armazenar as evoluções do projeto

  constructor(
    private http: HttpClient,
    private getProfileService: GetprofileService,
    private projectService: ProjectosService,
    private toastController: ToastController,
    private route: ActivatedRoute
  ) {}

 ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');

  if (!id || isNaN(+id)) {
    console.error('projectId inválido');
    this.presentToastError("Projeto não encontrado");
    return;
  }

  this.projectId = +id;
}


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.data_taken = new Date();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  enviarForm() {
    this.getProfileService.getUserProfile().subscribe((user: any) => {
      this.userId = user.id;

      const formData = new FormData();
      formData.append('photo', this.selectedFile!);
      formData.append('data_taken', this.data_taken.toISOString());
      formData.append('semanaAtual', this.semanaAtual.toString());
      formData.append('pesoAtual', this.pesoAtual.toString());
      formData.append('user_id', this.userId.toString());

      this.projectService.createProjectEvolution(this.projectId, formData).subscribe({
        next: (res) => {
          console.log('Foto enviada com sucesso', res);
          // Opcional: redirecionar, mostrar toast, etc.
          this.presentToastSuccess("Evolução do projeto atualizada com sucesso!");
          //navigate to tabs/projects
           setTimeout(() => {
            window.location.href = '/tabs/projetos';
          }, 1000);
        },
        error: (err) => {
          console.error('Erro ao enviar foto:', err);
          // Verifica se o erro é do servidor e exibe a mensagem de erro
          this.presentToastError(err.error.message || "Erro ao atualizar o projeto. Tente novamente.");
        },
      });
    });
  }

atualizarProjeto() {
  if (this.selectedFile && this.semanaAtual && this.pesoAtual) {
    this.enviarForm(); // reaproveita a lógica existente
  } else {
    this.presentToastError("Preenche todos os campos e seleciona uma imagem.");
  }
}




  async presentToastSuccess(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  } 

  async presentToastError(message: string) {
    const toast = await this.toastController.create({
      //error from server
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'danger',
    });
    toast.present();
  }
}
