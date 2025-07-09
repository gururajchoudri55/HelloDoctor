import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiotherapistDetailsComponent } from './physiotherapist-details.component';

describe('PhysiotherapistDetailsComponent', () => {
  let component: PhysiotherapistDetailsComponent;
  let fixture: ComponentFixture<PhysiotherapistDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysiotherapistDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiotherapistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
