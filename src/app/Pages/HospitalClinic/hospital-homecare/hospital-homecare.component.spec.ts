import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalHomecareComponent } from './hospital-homecare.component';

describe('HospitalHomecareComponent', () => {
  let component: HospitalHomecareComponent;
  let fixture: ComponentFixture<HospitalHomecareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalHomecareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalHomecareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
