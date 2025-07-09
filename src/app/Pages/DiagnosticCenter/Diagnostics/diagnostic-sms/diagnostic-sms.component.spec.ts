import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticSmsComponent } from './diagnostic-sms.component';

describe('DiagnosticSmsComponent', () => {
  let component: DiagnosticSmsComponent;
  let fixture: ComponentFixture<DiagnosticSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
