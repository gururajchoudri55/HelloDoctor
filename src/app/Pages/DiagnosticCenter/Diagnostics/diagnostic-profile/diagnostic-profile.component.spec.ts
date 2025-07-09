import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticProfileComponent } from './diagnostic-profile.component';

describe('DiagnosticProfileComponent', () => {
  let component: DiagnosticProfileComponent;
  let fixture: ComponentFixture<DiagnosticProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
