import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursePlanningDetailsComponent } from './nurse-planning-details.component';

describe('NursePlanningDetailsComponent', () => {
  let component: NursePlanningDetailsComponent;
  let fixture: ComponentFixture<NursePlanningDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursePlanningDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NursePlanningDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
