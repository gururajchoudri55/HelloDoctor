import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysioPaymentreceiptsComponent } from './physio-paymentreceipts.component';

describe('PhysioPaymentreceiptsComponent', () => {
  let component: PhysioPaymentreceiptsComponent;
  let fixture: ComponentFixture<PhysioPaymentreceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysioPaymentreceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysioPaymentreceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
