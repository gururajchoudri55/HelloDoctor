import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpHospitalComponent } from './sp-hospital.component';

describe('SpHospitalComponent', () => {
  let component: SpHospitalComponent;
  let fixture: ComponentFixture<SpHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
