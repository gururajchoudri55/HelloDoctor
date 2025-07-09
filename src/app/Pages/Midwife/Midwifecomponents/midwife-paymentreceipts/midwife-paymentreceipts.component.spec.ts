import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifePaymentreceiptsComponent } from './midwife-paymentreceipts.component';

describe('MidwifePaymentreceiptsComponent', () => {
  let component: MidwifePaymentreceiptsComponent;
  let fixture: ComponentFixture<MidwifePaymentreceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidwifePaymentreceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifePaymentreceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
