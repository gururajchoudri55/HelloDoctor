import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalSupportdashComponent } from './hospital-supportdash.component';

describe('HospitalSupportdashComponent', () => {
  let component: HospitalSupportdashComponent;
  let fixture: ComponentFixture<HospitalSupportdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalSupportdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalSupportdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
