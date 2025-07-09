import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiotherapistRegistrationComponent } from './physiotherapist-registration.component';

describe('PhysiotherapistRegistrationComponent', () => {
  let component: PhysiotherapistRegistrationComponent;
  let fixture: ComponentFixture<PhysiotherapistRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysiotherapistRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiotherapistRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
