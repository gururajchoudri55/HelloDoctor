import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpPharmacyComponent } from './sp-pharmacy.component';

describe('SpPharmacyComponent', () => {
  let component: SpPharmacyComponent;
  let fixture: ComponentFixture<SpPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpPharmacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
