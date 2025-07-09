import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityMasterDashboardComponent } from './city-master-dashboard.component';

describe('CityMasterDashboardComponent', () => {
  let component: CityMasterDashboardComponent;
  let fixture: ComponentFixture<CityMasterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityMasterDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityMasterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
