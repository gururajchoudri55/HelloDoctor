import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallRevenueDetailsComponent } from './video-call-revenue-details.component';

describe('VideoCallRevenueDetailsComponent', () => {
  let component: VideoCallRevenueDetailsComponent;
  let fixture: ComponentFixture<VideoCallRevenueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoCallRevenueDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCallRevenueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
