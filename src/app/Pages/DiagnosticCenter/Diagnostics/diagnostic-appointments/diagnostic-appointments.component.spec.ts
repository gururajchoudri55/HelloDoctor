import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticAppointmentsComponent } from './diagnostic-appointments.component';

describe('DiagnosticAppointmentsComponent', () => {
  let component: DiagnosticAppointmentsComponent;
  let fixture: ComponentFixture<DiagnosticAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
