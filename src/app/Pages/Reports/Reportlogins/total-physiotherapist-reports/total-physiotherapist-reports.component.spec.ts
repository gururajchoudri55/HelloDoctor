import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPhysiotherapistReportsComponent } from './total-physiotherapist-reports.component';

describe('TotalPhysiotherapistReportsComponent', () => {
  let component: TotalPhysiotherapistReportsComponent;
  let fixture: ComponentFixture<TotalPhysiotherapistReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPhysiotherapistReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPhysiotherapistReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
