import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectosService } from '../../services/projectos-service';
import { GetprofileService } from 'src/services/getprofile.service';


@Component({
  selector: 'app-projetos',
  standalone: false,
  templateUrl: './projetos.page.html',
  styleUrls: ['./projetos.page.scss'],
})
export class ProjetosPage implements OnInit {

  projetos: any[] = [];
  userId!: number;


  constructor(private projectosService: ProjectosService, private getProfileService: GetprofileService) { }

  ngOnInit() {

     this.getProfileService.getUserProfile().subscribe({
      next: (user) => {
        this.userId = user.id;
        this.carregarProjetos();
      },
      error: (err) => {
        console.error('Erro ao buscar perfil:', err);
      }
    });
    
  }

  carregarProjetos() {
    this.projectosService.getProjectsbyUserId(this.userId).subscribe({
      next: (data) => {
        this.projetos = data;
      },
      error: (err) => {
        console.error('Erro ao buscar projetos:', err);
        this.projetos = [];
      }
    });
  }

  
  }



  
