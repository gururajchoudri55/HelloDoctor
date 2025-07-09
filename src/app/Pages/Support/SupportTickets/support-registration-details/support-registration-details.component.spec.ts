import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportRegistrationDetailsComponent } from './support-registration-details.component';

describe('SupportRegistrationDetailsComponent', () => {
  let component: SupportRegistrationDetailsComponent;
  let fixture: ComponentFixture<SupportRegistrationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportRegistrationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportRegistrationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
