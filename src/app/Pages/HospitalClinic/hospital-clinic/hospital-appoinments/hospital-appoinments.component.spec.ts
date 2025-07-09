import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAppoinmentsComponent } from './hospital-appoinments.component';

describe('HospitalAppoinmentsComponent', () => {
  let component: HospitalAppoinmentsComponent;
  let fixture: ComponentFixture<HospitalAppoinmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalAppoinmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalAppoinmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
