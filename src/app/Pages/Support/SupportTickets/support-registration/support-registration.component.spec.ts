import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportRegistrationComponent } from './support-registration.component';

describe('SupportRegistrationComponent', () => {
  let component: SupportRegistrationComponent;
  let fixture: ComponentFixture<SupportRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
