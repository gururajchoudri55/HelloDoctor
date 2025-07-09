import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuePharmacyDashboardComponent } from './revenue-pharmacy-dashboard.component';

describe('RevenuePharmacyDashboardComponent', () => {
  let component: RevenuePharmacyDashboardComponent;
  let fixture: ComponentFixture<RevenuePharmacyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenuePharmacyDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuePharmacyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
