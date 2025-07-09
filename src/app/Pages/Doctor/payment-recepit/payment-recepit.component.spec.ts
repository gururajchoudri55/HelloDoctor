import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRecepitComponent } from './payment-recepit.component';

describe('PaymentRecepitComponent', () => {
  let component: PaymentRecepitComponent;
  let fixture: ComponentFixture<PaymentRecepitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentRecepitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentRecepitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
