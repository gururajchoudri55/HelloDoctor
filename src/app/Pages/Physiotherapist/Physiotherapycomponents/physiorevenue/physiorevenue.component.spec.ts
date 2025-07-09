import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiorevenueComponent } from './physiorevenue.component';

describe('PhysiorevenueComponent', () => {
  let component: PhysiorevenueComponent;
  let fixture: ComponentFixture<PhysiorevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysiorevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiorevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
