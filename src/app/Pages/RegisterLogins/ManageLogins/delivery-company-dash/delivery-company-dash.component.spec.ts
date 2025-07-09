import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCompanyDashComponent } from './delivery-company-dash.component';

describe('DeliveryCompanyDashComponent', () => {
  let component: DeliveryCompanyDashComponent;
  let fixture: ComponentFixture<DeliveryCompanyDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryCompanyDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCompanyDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
