import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalNurseReportsComponent } from './total-nurse-reports.component';

describe('TotalNurseReportsComponent', () => {
  let component: TotalNurseReportsComponent;
  let fixture: ComponentFixture<TotalNurseReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalNurseReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalNurseReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
