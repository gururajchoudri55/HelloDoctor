import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMonthlySubscriptionsComponent } from './all-monthly-subscriptions.component';

describe('AllMonthlySubscriptionsComponent', () => {
  let component: AllMonthlySubscriptionsComponent;
  let fixture: ComponentFixture<AllMonthlySubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMonthlySubscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMonthlySubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
