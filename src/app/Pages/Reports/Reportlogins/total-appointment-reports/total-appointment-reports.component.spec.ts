import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAppointmentReportsComponent } from './total-appointment-reports.component';

describe('TotalAppointmentReportsComponent', () => {
  let component: TotalAppointmentReportsComponent;
  let fixture: ComponentFixture<TotalAppointmentReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalAppointmentReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalAppointmentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
