import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseAppointmentsComponent } from './nurse-appointments.component';

describe('NurseAppointmentsComponent', () => {
  let component: NurseAppointmentsComponent;
  let fixture: ComponentFixture<NurseAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
