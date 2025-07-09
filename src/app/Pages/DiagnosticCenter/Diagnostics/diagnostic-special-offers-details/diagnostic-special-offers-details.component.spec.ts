import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticSpecialOffersDetailsComponent } from './diagnostic-special-offers-details.component';

describe('DiagnosticSpecialOffersDetailsComponent', () => {
  let component: DiagnosticSpecialOffersDetailsComponent;
  let fixture: ComponentFixture<DiagnosticSpecialOffersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticSpecialOffersDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticSpecialOffersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
