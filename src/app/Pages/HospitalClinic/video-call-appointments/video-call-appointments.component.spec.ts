import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallAppointmentsComponent } from './video-call-appointments.component';

describe('VideoCallAppointmentsComponent', () => {
  let component: VideoCallAppointmentsComponent;
  let fixture: ComponentFixture<VideoCallAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoCallAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCallAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
