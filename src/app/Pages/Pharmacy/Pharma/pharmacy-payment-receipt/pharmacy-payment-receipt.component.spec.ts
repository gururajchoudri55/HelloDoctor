import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyPaymentReceiptComponent } from './pharmacy-payment-receipt.component';

describe('PharmacyPaymentReceiptComponent', () => {
  let component: PharmacyPaymentReceiptComponent;
  let fixture: ComponentFixture<PharmacyPaymentReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyPaymentReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyPaymentReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
