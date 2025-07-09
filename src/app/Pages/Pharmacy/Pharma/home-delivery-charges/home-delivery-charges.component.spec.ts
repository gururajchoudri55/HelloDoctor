import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDeliveryChargesComponent } from './home-delivery-charges.component';

describe('HomeDeliveryChargesComponent', () => {
  let component: HomeDeliveryChargesComponent;
  let fixture: ComponentFixture<HomeDeliveryChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDeliveryChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDeliveryChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
