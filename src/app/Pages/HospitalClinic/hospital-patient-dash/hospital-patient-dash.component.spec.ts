import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalPatientDashComponent } from './hospital-patient-dash.component';

describe('HospitalPatientDashComponent', () => {
  let component: HospitalPatientDashComponent;
  let fixture: ComponentFixture<HospitalPatientDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalPatientDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalPatientDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
