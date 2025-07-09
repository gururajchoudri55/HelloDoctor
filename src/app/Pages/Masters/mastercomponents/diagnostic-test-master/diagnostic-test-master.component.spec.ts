import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticTestMasterComponent } from './diagnostic-test-master.component';

describe('DiagnosticTestMasterComponent', () => {
  let component: DiagnosticTestMasterComponent;
  let fixture: ComponentFixture<DiagnosticTestMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticTestMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticTestMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
