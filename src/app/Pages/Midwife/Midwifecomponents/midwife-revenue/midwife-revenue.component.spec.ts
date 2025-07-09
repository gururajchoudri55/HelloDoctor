import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeRevenueComponent } from './midwife-revenue.component';

describe('MidwifeRevenueComponent', () => {
  let component: MidwifeRevenueComponent;
  let fixture: ComponentFixture<MidwifeRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidwifeRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
