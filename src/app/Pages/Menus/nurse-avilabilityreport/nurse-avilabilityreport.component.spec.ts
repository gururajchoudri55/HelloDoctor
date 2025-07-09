import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseAvilabilityreportComponent } from './nurse-avilabilityreport.component';

describe('NurseAvilabilityreportComponent', () => {
  let component: NurseAvilabilityreportComponent;
  let fixture: ComponentFixture<NurseAvilabilityreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseAvilabilityreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseAvilabilityreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
