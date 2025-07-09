import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InClincAppointmentsComponent } from './in-clinc-appointments.component';

describe('InClincAppointmentsComponent', () => {
  let component: InClincAppointmentsComponent;
  let fixture: ComponentFixture<InClincAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InClincAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InClincAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
