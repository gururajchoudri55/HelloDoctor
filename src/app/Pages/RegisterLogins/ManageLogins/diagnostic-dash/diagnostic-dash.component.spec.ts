import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticDashComponent } from './diagnostic-dash.component';

describe('DiagnosticDashComponent', () => {
  let component: DiagnosticDashComponent;
  let fixture: ComponentFixture<DiagnosticDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
