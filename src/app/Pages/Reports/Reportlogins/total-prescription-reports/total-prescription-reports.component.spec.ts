import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPrescriptionReportsComponent } from './total-prescription-reports.component';

describe('TotalPrescriptionReportsComponent', () => {
  let component: TotalPrescriptionReportsComponent;
  let fixture: ComponentFixture<TotalPrescriptionReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPrescriptionReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPrescriptionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
