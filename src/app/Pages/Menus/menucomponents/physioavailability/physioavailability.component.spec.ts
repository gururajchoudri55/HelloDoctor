import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysioavailabilityComponent } from './physioavailability.component';

describe('PhysioavailabilityComponent', () => {
  let component: PhysioavailabilityComponent;
  let fixture: ComponentFixture<PhysioavailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysioavailabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysioavailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
