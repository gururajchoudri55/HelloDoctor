import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecpAppointmentsComponent } from './recp-appointments.component';

describe('RecpAppointmentsComponent', () => {
  let component: RecpAppointmentsComponent;
  let fixture: ComponentFixture<RecpAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecpAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecpAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
