import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanoDetalhePagePage } from './plano-detalhe-page.page';

describe('PlanoDetalhePagePage', () => {
  let component: PlanoDetalhePagePage;
  let fixture: ComponentFixture<PlanoDetalhePagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoDetalhePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
