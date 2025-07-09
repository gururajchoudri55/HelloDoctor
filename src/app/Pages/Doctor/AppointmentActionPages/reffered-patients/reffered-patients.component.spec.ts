import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefferedPatientsComponent } from './reffered-patients.component';

describe('RefferedPatientsComponent', () => {
  let component: RefferedPatientsComponent;
  let fixture: ComponentFixture<RefferedPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefferedPatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefferedPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
