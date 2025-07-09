import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpDiagnosticDetailsComponent } from './sp-diagnostic-details.component';

describe('SpDiagnosticDetailsComponent', () => {
  let component: SpDiagnosticDetailsComponent;
  let fixture: ComponentFixture<SpDiagnosticDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpDiagnosticDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpDiagnosticDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
