import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticTestTypeDetailsComponent } from './diagnostic-test-type-details.component';

describe('DiagnosticTestTypeDetailsComponent', () => {
  let component: DiagnosticTestTypeDetailsComponent;
  let fixture: ComponentFixture<DiagnosticTestTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticTestTypeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticTestTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
