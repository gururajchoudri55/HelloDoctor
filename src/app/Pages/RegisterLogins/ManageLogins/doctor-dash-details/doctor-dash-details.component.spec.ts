import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDashDetailsComponent } from './doctor-dash-details.component';

describe('DoctorDashDetailsComponent', () => {
  let component: DoctorDashDetailsComponent;
  let fixture: ComponentFixture<DoctorDashDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorDashDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDashDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
