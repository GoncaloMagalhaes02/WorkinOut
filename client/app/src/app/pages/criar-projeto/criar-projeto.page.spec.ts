import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarProjetoPage } from './criar-projeto.page';

describe('CriarProjetoPage', () => {
  let component: CriarProjetoPage;
  let fixture: ComponentFixture<CriarProjetoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarProjetoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
