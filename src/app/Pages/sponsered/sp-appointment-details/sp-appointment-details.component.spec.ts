import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpAppointmentDetailsComponent } from './sp-appointment-details.component';

describe('SpAppointmentDetailsComponent', () => {
  let component: SpAppointmentDetailsComponent;
  let fixture: ComponentFixture<SpAppointmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpAppointmentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpAppointmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
