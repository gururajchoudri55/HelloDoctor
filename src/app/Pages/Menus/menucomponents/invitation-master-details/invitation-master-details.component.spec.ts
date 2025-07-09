import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationMasterDetailsComponent } from './invitation-master-details.component';

describe('InvitationMasterDetailsComponent', () => {
  let component: InvitationMasterDetailsComponent;
  let fixture: ComponentFixture<InvitationMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationMasterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
