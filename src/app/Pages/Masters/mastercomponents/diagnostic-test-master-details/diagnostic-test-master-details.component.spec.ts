import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticTestMasterDetailsComponent } from './diagnostic-test-master-details.component';

describe('DiagnosticTestMasterDetailsComponent', () => {
  let component: DiagnosticTestMasterDetailsComponent;
  let fixture: ComponentFixture<DiagnosticTestMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticTestMasterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticTestMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
