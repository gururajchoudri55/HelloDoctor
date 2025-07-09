import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDashoardDetailsComponent } from './hospital-dashoard-details.component';

describe('HospitalDashoardDetailsComponent', () => {
  let component: HospitalDashoardDetailsComponent;
  let fixture: ComponentFixture<HospitalDashoardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalDashoardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalDashoardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
