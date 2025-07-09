import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyDashComponent } from './pharmacy-dash.component';

describe('PharmacyDashComponent', () => {
  let component: PharmacyDashComponent;
  let fixture: ComponentFixture<PharmacyDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
