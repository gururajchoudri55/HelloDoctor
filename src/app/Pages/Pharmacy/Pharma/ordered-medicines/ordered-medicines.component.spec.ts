import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedMedicinesComponent } from './ordered-medicines.component';

describe('OrderedMedicinesComponent', () => {
  let component: OrderedMedicinesComponent;
  let fixture: ComponentFixture<OrderedMedicinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedMedicinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
