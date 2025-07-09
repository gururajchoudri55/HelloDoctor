import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeRevenueDetailsComponent } from './midwife-revenue-details.component';

describe('MidwifeRevenueDetailsComponent', () => {
  let component: MidwifeRevenueDetailsComponent;
  let fixture: ComponentFixture<MidwifeRevenueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidwifeRevenueDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeRevenueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
