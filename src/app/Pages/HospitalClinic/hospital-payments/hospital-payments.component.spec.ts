import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalPaymentsComponent } from './hospital-payments.component';

describe('HospitalPaymentsComponent', () => {
  let component: HospitalPaymentsComponent;
  let fixture: ComponentFixture<HospitalPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
