import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceBillingDashboardComponent } from './finance-billing-dashboard.component';

describe('FinanceBillingDashboardComponent', () => {
  let component: FinanceBillingDashboardComponent;
  let fixture: ComponentFixture<FinanceBillingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceBillingDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceBillingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
