import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticSupportTicketsComponent } from './diagnostic-support-tickets.component';

describe('DiagnosticSupportTicketsComponent', () => {
  let component: DiagnosticSupportTicketsComponent;
  let fixture: ComponentFixture<DiagnosticSupportTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticSupportTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticSupportTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
