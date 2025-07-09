import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticOrdersComponent } from './diagnostic-orders.component';

describe('DiagnosticOrdersComponent', () => {
  let component: DiagnosticOrdersComponent;
  let fixture: ComponentFixture<DiagnosticOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
