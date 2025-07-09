import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticSpecialOffersComponent } from './diagnostic-special-offers.component';

describe('DiagnosticSpecialOffersComponent', () => {
  let component: DiagnosticSpecialOffersComponent;
  let fixture: ComponentFixture<DiagnosticSpecialOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticSpecialOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticSpecialOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
