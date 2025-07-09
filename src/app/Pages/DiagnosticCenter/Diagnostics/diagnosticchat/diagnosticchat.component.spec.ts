import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticchatComponent } from './diagnosticchat.component';

describe('DiagnosticchatComponent', () => {
  let component: DiagnosticchatComponent;
  let fixture: ComponentFixture<DiagnosticchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
