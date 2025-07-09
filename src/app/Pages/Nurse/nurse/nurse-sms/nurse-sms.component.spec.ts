import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseSmsComponent } from './nurse-sms.component';

describe('NurseSmsComponent', () => {
  let component: NurseSmsComponent;
  let fixture: ComponentFixture<NurseSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
