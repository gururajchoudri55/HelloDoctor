import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiodashdetailsComponent } from './physiodashdetails.component';

describe('PhysiodashdetailsComponent', () => {
  let component: PhysiodashdetailsComponent;
  let fixture: ComponentFixture<PhysiodashdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysiodashdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiodashdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
