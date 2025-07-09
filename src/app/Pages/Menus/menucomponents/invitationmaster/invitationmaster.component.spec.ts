import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationmasterComponent } from './invitationmaster.component';

describe('InvitationmasterComponent', () => {
  let component: InvitationmasterComponent;
  let fixture: ComponentFixture<InvitationmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
