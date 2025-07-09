import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalClinicComponent } from './hospital-clinic.component';

describe('HospitalClinicComponent', () => {
  let component: HospitalClinicComponent;
  let fixture: ComponentFixture<HospitalClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalClinicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
