import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursePlanningComponent } from './nurse-planning.component';

describe('NursePlanningComponent', () => {
  let component: NursePlanningComponent;
  let fixture: ComponentFixture<NursePlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursePlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NursePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
