import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAvailableReportComponent } from './doctor-available-report.component';

describe('DoctorAvailableReportComponent', () => {
  let component: DoctorAvailableReportComponent;
  let fixture: ComponentFixture<DoctorAvailableReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAvailableReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAvailableReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
