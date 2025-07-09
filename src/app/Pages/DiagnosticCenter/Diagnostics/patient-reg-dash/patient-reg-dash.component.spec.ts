import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegDashComponent } from './patient-reg-dash.component';

describe('PatientRegDashComponent', () => {
  let component: PatientRegDashComponent;
  let fixture: ComponentFixture<PatientRegDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientRegDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRegDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
