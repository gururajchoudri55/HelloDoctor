import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionMasterDetailsComponent } from './region-master-details.component';

describe('RegionMasterDetailsComponent', () => {
  let component: RegionMasterDetailsComponent;
  let fixture: ComponentFixture<RegionMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionMasterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
