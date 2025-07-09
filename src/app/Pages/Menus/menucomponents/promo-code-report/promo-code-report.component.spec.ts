import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodeReportComponent } from './promo-code-report.component';

describe('PromoCodeReportComponent', () => {
  let component: PromoCodeReportComponent;
  let fixture: ComponentFixture<PromoCodeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoCodeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoCodeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
