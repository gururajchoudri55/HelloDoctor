import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergePatientDataComponent } from './merge-patient-data.component';

describe('MergePatientDataComponent', () => {
  let component: MergePatientDataComponent;
  let fixture: ComponentFixture<MergePatientDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergePatientDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergePatientDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
