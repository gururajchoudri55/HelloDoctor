import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundCompletedTicketsComponent } from './refund-completed-tickets.component';

describe('RefundCompletedTicketsComponent', () => {
  let component: RefundCompletedTicketsComponent;
  let fixture: ComponentFixture<RefundCompletedTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundCompletedTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundCompletedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
