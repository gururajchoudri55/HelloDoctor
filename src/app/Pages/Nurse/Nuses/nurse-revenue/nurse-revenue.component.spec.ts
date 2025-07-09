import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseRevenueComponent } from './nurse-revenue.component';

describe('NurseRevenueComponent', () => {
  let component: NurseRevenueComponent;
  let fixture: ComponentFixture<NurseRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
