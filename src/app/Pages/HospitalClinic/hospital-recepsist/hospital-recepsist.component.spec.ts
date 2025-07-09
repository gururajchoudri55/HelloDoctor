import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalRecepsistComponent } from './hospital-recepsist.component';

describe('HospitalRecepsistComponent', () => {
  let component: HospitalRecepsistComponent;
  let fixture: ComponentFixture<HospitalRecepsistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalRecepsistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalRecepsistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
