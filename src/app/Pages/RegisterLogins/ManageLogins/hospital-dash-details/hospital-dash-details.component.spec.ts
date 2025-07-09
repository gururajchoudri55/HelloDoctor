import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDashDetailsComponent } from './hospital-dash-details.component';

describe('HospitalDashDetailsComponent', () => {
  let component: HospitalDashDetailsComponent;
  let fixture: ComponentFixture<HospitalDashDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalDashDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalDashDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
