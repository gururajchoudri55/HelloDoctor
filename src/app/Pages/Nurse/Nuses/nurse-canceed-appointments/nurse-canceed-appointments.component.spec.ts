import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseCanceedAppointmentsComponent } from './nurse-canceed-appointments.component';

describe('NurseCanceedAppointmentsComponent', () => {
  let component: NurseCanceedAppointmentsComponent;
  let fixture: ComponentFixture<NurseCanceedAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseCanceedAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseCanceedAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
