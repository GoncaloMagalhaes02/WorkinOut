import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateWorkoutPlanPage } from './create-workout-plan.page';

describe('CreateWorkoutPlanPage', () => {
  let component: CreateWorkoutPlanPage;
  let fixture: ComponentFixture<CreateWorkoutPlanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkoutPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
