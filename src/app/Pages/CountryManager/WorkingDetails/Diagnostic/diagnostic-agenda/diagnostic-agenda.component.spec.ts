import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticAgendaComponent } from './diagnostic-agenda.component';

describe('DiagnosticAgendaComponent', () => {
  let component: DiagnosticAgendaComponent;
  let fixture: ComponentFixture<DiagnosticAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
