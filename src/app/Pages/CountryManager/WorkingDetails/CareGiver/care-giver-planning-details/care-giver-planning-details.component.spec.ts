import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareGiverPlanningDetailsComponent } from './care-giver-planning-details.component';

describe('CareGiverPlanningDetailsComponent', () => {
  let component: CareGiverPlanningDetailsComponent;
  let fixture: ComponentFixture<CareGiverPlanningDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareGiverPlanningDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareGiverPlanningDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
