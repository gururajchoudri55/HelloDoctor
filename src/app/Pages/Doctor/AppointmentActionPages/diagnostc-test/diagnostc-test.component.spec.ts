import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnostcTestComponent } from './diagnostc-test.component';

describe('DiagnostcTestComponent', () => {
  let component: DiagnostcTestComponent;
  let fixture: ComponentFixture<DiagnostcTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnostcTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnostcTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
