import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InseredadosPage } from './inseredados.page';

describe('InseredadosPage', () => {
  let component: InseredadosPage;
  let fixture: ComponentFixture<InseredadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InseredadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
