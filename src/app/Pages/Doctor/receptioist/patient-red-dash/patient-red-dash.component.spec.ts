import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRedDashComponent } from './patient-red-dash.component';

describe('PatientRedDashComponent', () => {
  let component: PatientRedDashComponent;
  let fixture: ComponentFixture<PatientRedDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientRedDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRedDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
