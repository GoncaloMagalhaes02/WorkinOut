import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarExercicioPage } from './criar-exercicio.page';

describe('CriarExercicioPage', () => {
  let component: CriarExercicioPage;
  let fixture: ComponentFixture<CriarExercicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarExercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
