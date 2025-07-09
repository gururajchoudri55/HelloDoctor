import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCompanyDetailsComponent } from './delivery-company-details.component';

describe('DeliveryCompanyDetailsComponent', () => {
  let component: DeliveryCompanyDetailsComponent;
  let fixture: ComponentFixture<DeliveryCompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryCompanyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
