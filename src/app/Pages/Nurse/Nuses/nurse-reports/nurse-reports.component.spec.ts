import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseReportsComponent } from './nurse-reports.component';

describe('NurseReportsComponent', () => {
  let component: NurseReportsComponent;
  let fixture: ComponentFixture<NurseReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
