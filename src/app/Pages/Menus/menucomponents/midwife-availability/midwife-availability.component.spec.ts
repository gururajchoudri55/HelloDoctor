import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeAvailabilityComponent } from './midwife-availability.component';

describe('MidwifeAvailabilityComponent', () => {
  let component: MidwifeAvailabilityComponent;
  let fixture: ComponentFixture<MidwifeAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidwifeAvailabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
