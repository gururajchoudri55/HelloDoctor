import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticChangePasswordComponent } from './diagnostic-change-password.component';

describe('DiagnosticChangePasswordComponent', () => {
  let component: DiagnosticChangePasswordComponent;
  let fixture: ComponentFixture<DiagnosticChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticChangePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
