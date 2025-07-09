import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticReceptionistLoginDetailsComponent } from './diagnostic-receptionist-login-details.component';

describe('DiagnosticReceptionistLoginDetailsComponent', () => {
  let component: DiagnosticReceptionistLoginDetailsComponent;
  let fixture: ComponentFixture<DiagnosticReceptionistLoginDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticReceptionistLoginDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticReceptionistLoginDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
