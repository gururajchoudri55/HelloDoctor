import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticReceptionistLoginComponent } from './diagnostic-receptionist-login.component';

describe('DiagnosticReceptionistLoginComponent', () => {
  let component: DiagnosticReceptionistLoginComponent;
  let fixture: ComponentFixture<DiagnosticReceptionistLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticReceptionistLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticReceptionistLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
