import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDeliveryFeesDetailsComponent } from './home-delivery-fees-details.component';

describe('HomeDeliveryFeesDetailsComponent', () => {
  let component: HomeDeliveryFeesDetailsComponent;
  let fixture: ComponentFixture<HomeDeliveryFeesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDeliveryFeesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDeliveryFeesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
