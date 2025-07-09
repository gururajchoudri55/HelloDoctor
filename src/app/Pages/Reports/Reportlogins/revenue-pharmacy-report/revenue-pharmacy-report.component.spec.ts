import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuePharmacyReportComponent } from './revenue-pharmacy-report.component';

describe('RevenuePharmacyReportComponent', () => {
  let component: RevenuePharmacyReportComponent;
  let fixture: ComponentFixture<RevenuePharmacyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenuePharmacyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuePharmacyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
