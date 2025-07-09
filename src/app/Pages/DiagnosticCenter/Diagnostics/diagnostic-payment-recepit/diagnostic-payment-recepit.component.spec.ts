import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticPaymentRecepitComponent } from './diagnostic-payment-recepit.component';

describe('DiagnosticPaymentRecepitComponent', () => {
  let component: DiagnosticPaymentRecepitComponent;
  let fixture: ComponentFixture<DiagnosticPaymentRecepitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticPaymentRecepitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticPaymentRecepitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
