import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalRecepsistDashComponent } from './hospital-recepsist-dash.component';

describe('HospitalRecepsistDashComponent', () => {
  let component: HospitalRecepsistDashComponent;
  let fixture: ComponentFixture<HospitalRecepsistDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalRecepsistDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalRecepsistDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
