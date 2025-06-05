import { Component, OnInit } from '@angular/core';
import { ProjectosService } from 'src/app/services/projectos-service';
import { GetprofileService } from 'src/services/getprofile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-projeto',
  templateUrl: './detalhes-projeto.page.html',
  styleUrls: ['./detalhes-projeto.page.scss'],
  standalone: false,
})
export class DetalhesProjetoPage implements OnInit {
  constructor(
    private projectosService: ProjectosService,
    private route: ActivatedRoute
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
}
