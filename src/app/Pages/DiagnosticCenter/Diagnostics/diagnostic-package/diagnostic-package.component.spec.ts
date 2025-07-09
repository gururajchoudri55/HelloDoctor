import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticPackageComponent } from './diagnostic-package.component';

describe('DiagnosticPackageComponent', () => {
  let component: DiagnosticPackageComponent;
  let fixture: ComponentFixture<DiagnosticPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
