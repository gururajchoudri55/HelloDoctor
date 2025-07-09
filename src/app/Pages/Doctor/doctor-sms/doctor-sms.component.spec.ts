import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSmsComponent } from './doctor-sms.component';

describe('DoctorSmsComponent', () => {
  let component: DoctorSmsComponent;
  let fixture: ComponentFixture<DoctorSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
