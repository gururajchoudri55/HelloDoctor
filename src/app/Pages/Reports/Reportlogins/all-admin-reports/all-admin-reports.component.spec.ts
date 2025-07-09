import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdminReportsComponent } from './all-admin-reports.component';

describe('AllAdminReportsComponent', () => {
  let component: AllAdminReportsComponent;
  let fixture: ComponentFixture<AllAdminReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAdminReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAdminReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
