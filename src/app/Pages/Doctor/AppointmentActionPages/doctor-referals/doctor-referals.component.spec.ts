import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorReferalsComponent } from './doctor-referals.component';

describe('DoctorReferalsComponent', () => {
  let component: DoctorReferalsComponent;
  let fixture: ComponentFixture<DoctorReferalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorReferalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorReferalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
