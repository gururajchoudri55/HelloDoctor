import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalPatientReportComponent } from './vital-patient-report.component';

describe('VitalPatientReportComponent', () => {
  let component: VitalPatientReportComponent;
  let fixture: ComponentFixture<VitalPatientReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalPatientReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalPatientReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
