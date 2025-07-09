import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAccountConfigComponent } from './payment-account-config.component';

describe('PaymentAccountConfigComponent', () => {
  let component: PaymentAccountConfigComponent;
  let fixture: ComponentFixture<PaymentAccountConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentAccountConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAccountConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
