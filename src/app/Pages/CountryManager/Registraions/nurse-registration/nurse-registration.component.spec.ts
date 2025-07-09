import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseRegistrationComponent } from './nurse-registration.component';

describe('NurseRegistrationComponent', () => {
  let component: NurseRegistrationComponent;
  let fixture: ComponentFixture<NurseRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
