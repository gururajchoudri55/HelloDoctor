import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpPharmacyDetailsComponent } from './sp-pharmacy-details.component';

describe('SpPharmacyDetailsComponent', () => {
  let component: SpPharmacyDetailsComponent;
  let fixture: ComponentFixture<SpPharmacyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpPharmacyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpPharmacyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
