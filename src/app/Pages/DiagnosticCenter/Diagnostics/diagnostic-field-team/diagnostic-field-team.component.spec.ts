import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticFieldTeamComponent } from './diagnostic-field-team.component';

describe('DiagnosticFieldTeamComponent', () => {
  let component: DiagnosticFieldTeamComponent;
  let fixture: ComponentFixture<DiagnosticFieldTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticFieldTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticFieldTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
