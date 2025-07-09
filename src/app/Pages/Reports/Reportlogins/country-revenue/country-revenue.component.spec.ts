import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryRevenueComponent } from './country-revenue.component';

describe('CountryRevenueComponent', () => {
  let component: CountryRevenueComponent;
  let fixture: ComponentFixture<CountryRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
