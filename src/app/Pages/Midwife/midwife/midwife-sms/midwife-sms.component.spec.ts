import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeSmsComponent } from './midwife-sms.component';

describe('MidwifeSmsComponent', () => {
  let component: MidwifeSmsComponent;
  let fixture: ComponentFixture<MidwifeSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidwifeSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
