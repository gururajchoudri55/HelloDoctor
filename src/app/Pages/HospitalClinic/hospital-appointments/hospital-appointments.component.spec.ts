import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAppointmentsComponent } from './hospital-appointments.component';

describe('HospitalAppointmentsComponent', () => {
  let component: HospitalAppointmentsComponent;
  let fixture: ComponentFixture<HospitalAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
