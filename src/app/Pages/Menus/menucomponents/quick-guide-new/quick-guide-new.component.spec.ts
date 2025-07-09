import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickGuideNewComponent } from './quick-guide-new.component';

describe('QuickGuideNewComponent', () => {
  let component: QuickGuideNewComponent;
  let fixture: ComponentFixture<QuickGuideNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickGuideNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickGuideNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
