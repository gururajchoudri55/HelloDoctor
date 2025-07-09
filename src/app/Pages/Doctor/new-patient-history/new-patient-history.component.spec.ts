import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPatientHistoryComponent } from './new-patient-history.component';

describe('NewPatientHistoryComponent', () => {
  let component: NewPatientHistoryComponent;
  let fixture: ComponentFixture<NewPatientHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPatientHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPatientHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
