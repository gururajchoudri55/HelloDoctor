import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiotherapistDashComponent } from './physiotherapist-dash.component';

describe('PhysiotherapistDashComponent', () => {
  let component: PhysiotherapistDashComponent;
  let fixture: ComponentFixture<PhysiotherapistDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysiotherapistDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiotherapistDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
