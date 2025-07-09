import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintMasterDetailsComponent } from './complaint-master-details.component';

describe('ComplaintMasterDetailsComponent', () => {
  let component: ComplaintMasterDetailsComponent;
  let fixture: ComponentFixture<ComplaintMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintMasterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
