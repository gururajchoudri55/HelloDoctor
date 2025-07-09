import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDashComponent } from './hospital-dash.component';

describe('HospitalDashComponent', () => {
  let component: HospitalDashComponent;
  let fixture: ComponentFixture<HospitalDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
