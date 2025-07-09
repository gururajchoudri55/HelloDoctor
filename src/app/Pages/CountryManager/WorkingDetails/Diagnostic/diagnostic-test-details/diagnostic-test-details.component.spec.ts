import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticTestDetailsComponent } from './diagnostic-test-details.component';

describe('DiagnosticTestDetailsComponent', () => {
  let component: DiagnosticTestDetailsComponent;
  let fixture: ComponentFixture<DiagnosticTestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticTestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticTestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
