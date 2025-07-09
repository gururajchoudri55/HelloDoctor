import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSupportDashComponent } from './doctor-support-dash.component';

describe('DoctorSupportDashComponent', () => {
  let component: DoctorSupportDashComponent;
  let fixture: ComponentFixture<DoctorSupportDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSupportDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSupportDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
