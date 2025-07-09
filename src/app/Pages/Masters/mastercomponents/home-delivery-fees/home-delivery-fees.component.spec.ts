import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDeliveryFeesComponent } from './home-delivery-fees.component';

describe('HomeDeliveryFeesComponent', () => {
  let component: HomeDeliveryFeesComponent;
  let fixture: ComponentFixture<HomeDeliveryFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDeliveryFeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDeliveryFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
