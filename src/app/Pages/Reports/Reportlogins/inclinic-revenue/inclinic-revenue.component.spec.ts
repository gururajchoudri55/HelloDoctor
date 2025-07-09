import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InclinicRevenueComponent } from './inclinic-revenue.component';

describe('InclinicRevenueComponent', () => {
  let component: InclinicRevenueComponent;
  let fixture: ComponentFixture<InclinicRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InclinicRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InclinicRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
