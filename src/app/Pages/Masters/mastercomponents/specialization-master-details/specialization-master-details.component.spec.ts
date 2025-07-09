import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationMasterDetailsComponent } from './specialization-master-details.component';

describe('SpecializationMasterDetailsComponent', () => {
  let component: SpecializationMasterDetailsComponent;
  let fixture: ComponentFixture<SpecializationMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecializationMasterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializationMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
