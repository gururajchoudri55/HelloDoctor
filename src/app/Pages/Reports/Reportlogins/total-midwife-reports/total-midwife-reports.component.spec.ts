import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalMidwifeReportsComponent } from './total-midwife-reports.component';

describe('TotalMidwifeReportsComponent', () => {
  let component: TotalMidwifeReportsComponent;
  let fixture: ComponentFixture<TotalMidwifeReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalMidwifeReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalMidwifeReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
