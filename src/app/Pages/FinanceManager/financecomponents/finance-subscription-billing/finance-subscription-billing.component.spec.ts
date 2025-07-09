import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceSubscriptionBillingComponent } from './finance-subscription-billing.component';

describe('FinanceSubscriptionBillingComponent', () => {
  let component: FinanceSubscriptionBillingComponent;
  let fixture: ComponentFixture<FinanceSubscriptionBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceSubscriptionBillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceSubscriptionBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
