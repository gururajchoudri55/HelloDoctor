import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareGiverPlanningComponent } from './care-giver-planning.component';

describe('CareGiverPlanningComponent', () => {
  let component: CareGiverPlanningComponent;
  let fixture: ComponentFixture<CareGiverPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareGiverPlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareGiverPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
