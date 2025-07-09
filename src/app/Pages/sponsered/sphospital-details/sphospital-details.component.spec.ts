import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SPHospitalDetailsComponent } from './sphospital-details.component';

describe('SPHospitalDetailsComponent', () => {
  let component: SPHospitalDetailsComponent;
  let fixture: ComponentFixture<SPHospitalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SPHospitalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SPHospitalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
