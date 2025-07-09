import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticTestNewComponent } from './diagnostic-test-new.component';

describe('DiagnosticTestNewComponent', () => {
  let component: DiagnosticTestNewComponent;
  let fixture: ComponentFixture<DiagnosticTestNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticTestNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticTestNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
