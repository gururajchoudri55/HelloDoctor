import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticFieldTeamDetailsComponent } from './diagnostic-field-team-details.component';

describe('DiagnosticFieldTeamDetailsComponent', () => {
  let component: DiagnosticFieldTeamDetailsComponent;
  let fixture: ComponentFixture<DiagnosticFieldTeamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticFieldTeamDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticFieldTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
