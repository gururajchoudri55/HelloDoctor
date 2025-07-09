import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareGiverServicesComponent } from './care-giver-services.component';

describe('CareGiverServicesComponent', () => {
  let component: CareGiverServicesComponent;
  let fixture: ComponentFixture<CareGiverServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareGiverServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareGiverServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
