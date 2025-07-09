import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticHomeReportComponent } from './diagnostic-home-report.component';

describe('DiagnosticHomeReportComponent', () => {
  let component: DiagnosticHomeReportComponent;
  let fixture: ComponentFixture<DiagnosticHomeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticHomeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticHomeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
