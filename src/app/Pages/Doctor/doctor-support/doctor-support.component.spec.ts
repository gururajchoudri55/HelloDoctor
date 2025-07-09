import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSupportComponent } from './doctor-support.component';

describe('DoctorSupportComponent', () => {
  let component: DoctorSupportComponent;
  let fixture: ComponentFixture<DoctorSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
