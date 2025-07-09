import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalDiagnosticReportsComponent } from './total-diagnostic-reports.component';

describe('TotalDiagnosticReportsComponent', () => {
  let component: TotalDiagnosticReportsComponent;
  let fixture: ComponentFixture<TotalDiagnosticReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalDiagnosticReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalDiagnosticReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
