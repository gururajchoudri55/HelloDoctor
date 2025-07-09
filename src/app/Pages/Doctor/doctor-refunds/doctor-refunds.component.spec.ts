import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRefundsComponent } from './doctor-refunds.component';

describe('DoctorRefundsComponent', () => {
  let component: DoctorRefundsComponent;
  let fixture: ComponentFixture<DoctorRefundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorRefundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorRefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
