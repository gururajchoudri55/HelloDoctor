import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRevenueComponent } from './my-revenue.component';

describe('MyRevenueComponent', () => {
  let component: MyRevenueComponent;
  let fixture: ComponentFixture<MyRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
