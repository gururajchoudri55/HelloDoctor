import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticLabTechComponent } from './diagnostic-lab-tech.component';

describe('DiagnosticLabTechComponent', () => {
  let component: DiagnosticLabTechComponent;
  let fixture: ComponentFixture<DiagnosticLabTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticLabTechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticLabTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
