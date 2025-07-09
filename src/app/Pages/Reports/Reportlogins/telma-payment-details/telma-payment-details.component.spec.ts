import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelmaPaymentDetailsComponent } from './telma-payment-details.component';

describe('TelmaPaymentDetailsComponent', () => {
  let component: TelmaPaymentDetailsComponent;
  let fixture: ComponentFixture<TelmaPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelmaPaymentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelmaPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
