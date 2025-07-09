import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareGiverServiceDetailsComponent } from './care-giver-service-details.component';

describe('CareGiverServiceDetailsComponent', () => {
  let component: CareGiverServiceDetailsComponent;
  let fixture: ComponentFixture<CareGiverServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareGiverServiceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareGiverServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
