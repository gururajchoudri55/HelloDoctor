import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePaidReportsComponent } from './finance-paid-reports.component';

describe('FinancePaidReportsComponent', () => {
  let component: FinancePaidReportsComponent;
  let fixture: ComponentFixture<FinancePaidReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancePaidReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancePaidReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
