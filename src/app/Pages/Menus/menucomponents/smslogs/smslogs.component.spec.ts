import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmslogsComponent } from './smslogs.component';

describe('SmslogsComponent', () => {
  let component: SmslogsComponent;
  let fixture: ComponentFixture<SmslogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmslogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmslogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
