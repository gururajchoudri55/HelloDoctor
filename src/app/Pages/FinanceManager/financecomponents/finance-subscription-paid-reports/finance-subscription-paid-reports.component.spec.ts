import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceSubscriptionPaidReportsComponent } from './finance-subscription-paid-reports.component';

describe('FinanceSubscriptionPaidReportsComponent', () => {
  let component: FinanceSubscriptionPaidReportsComponent;
  let fixture: ComponentFixture<FinanceSubscriptionPaidReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceSubscriptionPaidReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceSubscriptionPaidReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
