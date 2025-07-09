import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticdashComponent } from './diagnosticdash.component';

describe('DiagnosticdashComponent', () => {
  let component: DiagnosticdashComponent;
  let fixture: ComponentFixture<DiagnosticdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
