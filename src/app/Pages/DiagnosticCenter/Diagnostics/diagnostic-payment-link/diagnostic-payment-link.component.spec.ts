import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticPaymentLinkComponent } from './diagnostic-payment-link.component';

describe('DiagnosticPaymentLinkComponent', () => {
  let component: DiagnosticPaymentLinkComponent;
  let fixture: ComponentFixture<DiagnosticPaymentLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticPaymentLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticPaymentLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
