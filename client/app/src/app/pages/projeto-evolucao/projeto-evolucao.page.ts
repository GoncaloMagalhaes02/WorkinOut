import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetprofileService } from 'src/services/getprofile.service';
import { ProjectosService } from 'src/app/services/projectos-service';
import { ToastController } from '@ionic/angular';

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
  projectId: number = 1; // <-- Troca este valor conforme necessário
  data_taken!: Date;

  constructor(
    private http: HttpClient,
    private getProfileService: GetprofileService,
    private projectService: ProjectosService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

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
        },
        error: (err) => {
          console.error('Erro ao enviar foto:', err);
        },
      });
    });
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
