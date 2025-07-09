import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCareRevenueDetailsComponent } from './home-care-revenue-details.component';

describe('HomeCareRevenueDetailsComponent', () => {
  let component: HomeCareRevenueDetailsComponent;
  let fixture: ComponentFixture<HomeCareRevenueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCareRevenueDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCareRevenueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
