import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticPackageDetailsComponent } from './diagnostic-package-details.component';

describe('DiagnosticPackageDetailsComponent', () => {
  let component: DiagnosticPackageDetailsComponent;
  let fixture: ComponentFixture<DiagnosticPackageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticPackageDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticPackageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
