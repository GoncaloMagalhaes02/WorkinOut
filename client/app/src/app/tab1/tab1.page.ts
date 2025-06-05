import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth-service.service';
import { ProjectosService } from '../services/projectos-service';
import { GetprofileService } from 'src/services/getprofile.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  projeto: any;
  id!: number;

  constructor(
    private authService: AuthService,
    private projectService: ProjectosService,
    private http: HttpClient,
    private getProfile: GetprofileService
  ) {}

  ngOnInit() {}
}
