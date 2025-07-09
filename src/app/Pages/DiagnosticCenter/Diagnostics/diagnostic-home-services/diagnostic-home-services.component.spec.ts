import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticHomeServicesComponent } from './diagnostic-home-services.component';

describe('DiagnosticHomeServicesComponent', () => {
  let component: DiagnosticHomeServicesComponent;
  let fixture: ComponentFixture<DiagnosticHomeServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticHomeServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticHomeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
