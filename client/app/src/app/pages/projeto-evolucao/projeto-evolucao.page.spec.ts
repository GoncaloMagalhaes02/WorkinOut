import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjetoEvolucaoPage } from './projeto-evolucao.page';

describe('ProjetoEvolucaoPage', () => {
  let component: ProjetoEvolucaoPage;
  let fixture: ComponentFixture<ProjetoEvolucaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoEvolucaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
