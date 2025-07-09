import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInvitationsComponent } from './patient-invitations.component';

describe('PatientInvitationsComponent', () => {
  let component: PatientInvitationsComponent;
  let fixture: ComponentFixture<PatientInvitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientInvitationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
