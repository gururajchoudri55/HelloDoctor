import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpDiagnosticCenterComponent } from './sp-diagnostic-center.component';

describe('SpDiagnosticCenterComponent', () => {
  let component: SpDiagnosticCenterComponent;
  let fixture: ComponentFixture<SpDiagnosticCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpDiagnosticCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpDiagnosticCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
