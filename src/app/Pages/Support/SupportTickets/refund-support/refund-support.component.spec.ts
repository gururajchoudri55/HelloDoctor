import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundSupportComponent } from './refund-support.component';

describe('RefundSupportComponent', () => {
  let component: RefundSupportComponent;
  let fixture: ComponentFixture<RefundSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
