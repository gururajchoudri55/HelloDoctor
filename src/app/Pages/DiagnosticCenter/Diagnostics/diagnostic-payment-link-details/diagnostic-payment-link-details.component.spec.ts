import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticPaymentLinkDetailsComponent } from './diagnostic-payment-link-details.component';

describe('DiagnosticPaymentLinkDetailsComponent', () => {
  let component: DiagnosticPaymentLinkDetailsComponent;
  let fixture: ComponentFixture<DiagnosticPaymentLinkDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticPaymentLinkDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticPaymentLinkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
