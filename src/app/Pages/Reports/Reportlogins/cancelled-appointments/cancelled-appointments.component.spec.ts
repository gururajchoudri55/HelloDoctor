import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledAppointmentsComponent } from './cancelled-appointments.component';

describe('CancelledAppointmentsComponent', () => {
  let component: CancelledAppointmentsComponent;
  let fixture: ComponentFixture<CancelledAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
