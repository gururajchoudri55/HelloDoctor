import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticPlanningDetailsComponent } from './diagnostic-planning-details.component';

describe('DiagnosticPlanningDetailsComponent', () => {
  let component: DiagnosticPlanningDetailsComponent;
  let fixture: ComponentFixture<DiagnosticPlanningDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticPlanningDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticPlanningDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
