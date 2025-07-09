import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardMasterComponent } from './credit-card-master.component';

describe('CreditCardMasterComponent', () => {
  let component: CreditCardMasterComponent;
  let fixture: ComponentFixture<CreditCardMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
