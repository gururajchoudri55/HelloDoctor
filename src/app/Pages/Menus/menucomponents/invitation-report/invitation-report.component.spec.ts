import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationReportComponent } from './invitation-report.component';

describe('InvitationReportComponent', () => {
  let component: InvitationReportComponent;
  let fixture: ComponentFixture<InvitationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
