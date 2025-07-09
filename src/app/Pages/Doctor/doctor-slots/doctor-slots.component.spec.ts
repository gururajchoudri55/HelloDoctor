import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSlotsComponent } from './doctor-slots.component';

describe('DoctorSlotsComponent', () => {
  let component: DoctorSlotsComponent;
  let fixture: ComponentFixture<DoctorSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSlotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
