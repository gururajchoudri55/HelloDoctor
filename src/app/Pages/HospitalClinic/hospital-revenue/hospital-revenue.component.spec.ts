import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalRevenueComponent } from './hospital-revenue.component';

describe('HospitalRevenueComponent', () => {
  let component: HospitalRevenueComponent;
  let fixture: ComponentFixture<HospitalRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
