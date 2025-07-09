import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpAppointmentSponsershipComponent } from './sp-appointment-sponsership.component';

describe('SpAppointmentSponsershipComponent', () => {
  let component: SpAppointmentSponsershipComponent;
  let fixture: ComponentFixture<SpAppointmentSponsershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpAppointmentSponsershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpAppointmentSponsershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
