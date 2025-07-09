import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InClinicRevenueDetailsComponent } from './in-clinic-revenue-details.component';

describe('InClinicRevenueDetailsComponent', () => {
  let component: InClinicRevenueDetailsComponent;
  let fixture: ComponentFixture<InClinicRevenueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InClinicRevenueDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InClinicRevenueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
