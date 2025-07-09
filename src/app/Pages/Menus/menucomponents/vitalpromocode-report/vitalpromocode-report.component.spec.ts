import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalpromocodeReportComponent } from './vitalpromocode-report.component';

describe('VitalpromocodeReportComponent', () => {
  let component: VitalpromocodeReportComponent;
  let fixture: ComponentFixture<VitalpromocodeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalpromocodeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalpromocodeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
