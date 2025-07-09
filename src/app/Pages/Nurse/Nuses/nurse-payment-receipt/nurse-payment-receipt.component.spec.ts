import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursePaymentReceiptComponent } from './nurse-payment-receipt.component';

describe('NursePaymentReceiptComponent', () => {
  let component: NursePaymentReceiptComponent;
  let fixture: ComponentFixture<NursePaymentReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursePaymentReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NursePaymentReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
