import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverydashComponent } from './deliverydash.component';

describe('DeliverydashComponent', () => {
  let component: DeliverydashComponent;
  let fixture: ComponentFixture<DeliverydashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverydashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverydashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
