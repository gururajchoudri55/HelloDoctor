import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticPlanningComponent } from './diagnostic-planning.component';

describe('DiagnosticPlanningComponent', () => {
  let component: DiagnosticPlanningComponent;
  let fixture: ComponentFixture<DiagnosticPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticPlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
