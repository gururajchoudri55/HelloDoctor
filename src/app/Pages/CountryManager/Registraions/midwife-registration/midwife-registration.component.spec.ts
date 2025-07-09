import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeRegistrationComponent } from './midwife-registration.component';

describe('MidwifeRegistrationComponent', () => {
  let component: MidwifeRegistrationComponent;
  let fixture: ComponentFixture<MidwifeRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidwifeRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
