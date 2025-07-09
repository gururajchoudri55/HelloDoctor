import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMailsComponent } from './send-mails.component';

describe('SendMailsComponent', () => {
  let component: SendMailsComponent;
  let fixture: ComponentFixture<SendMailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
