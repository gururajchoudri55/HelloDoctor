import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaignosticTestTypeComponent } from './daignostic-test-type.component';

describe('DaignosticTestTypeComponent', () => {
  let component: DaignosticTestTypeComponent;
  let fixture: ComponentFixture<DaignosticTestTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaignosticTestTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaignosticTestTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
