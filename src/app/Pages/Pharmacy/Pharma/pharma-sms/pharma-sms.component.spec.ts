import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaSmsComponent } from './pharma-sms.component';

describe('PharmaSmsComponent', () => {
  let component: PharmaSmsComponent;
  let fixture: ComponentFixture<PharmaSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmaSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
