import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementdetailsComponent } from './announcementdetails.component';

describe('AnnouncementdetailsComponent', () => {
  let component: AnnouncementdetailsComponent;
  let fixture: ComponentFixture<AnnouncementdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
