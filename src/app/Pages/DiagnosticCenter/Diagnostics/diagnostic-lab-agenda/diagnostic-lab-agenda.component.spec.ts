import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticLabAgendaComponent } from './diagnostic-lab-agenda.component';

describe('DiagnosticLabAgendaComponent', () => {
  let component: DiagnosticLabAgendaComponent;
  let fixture: ComponentFixture<DiagnosticLabAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticLabAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticLabAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
