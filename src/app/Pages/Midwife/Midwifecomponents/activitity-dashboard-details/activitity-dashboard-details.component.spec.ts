import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitityDashboardDetailsComponent } from './activitity-dashboard-details.component';

describe('ActivitityDashboardDetailsComponent', () => {
  let component: ActivitityDashboardDetailsComponent;
  let fixture: ComponentFixture<ActivitityDashboardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitityDashboardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitityDashboardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
