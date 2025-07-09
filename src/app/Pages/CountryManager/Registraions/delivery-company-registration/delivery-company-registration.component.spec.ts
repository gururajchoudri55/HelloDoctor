import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCompanyRegistrationComponent } from './delivery-company-registration.component';

describe('DeliveryCompanyRegistrationComponent', () => {
  let component: DeliveryCompanyRegistrationComponent;
  let fixture: ComponentFixture<DeliveryCompanyRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryCompanyRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCompanyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
