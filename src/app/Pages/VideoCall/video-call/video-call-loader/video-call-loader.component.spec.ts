import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallLoaderComponent } from './video-call-loader.component';

describe('VideoCallLoaderComponent', () => {
  let component: VideoCallLoaderComponent;
  let fixture: ComponentFixture<VideoCallLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoCallLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCallLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
