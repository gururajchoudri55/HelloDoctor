import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickerGuideComponent } from './quicker-guide.component';

describe('QuickerGuideComponent', () => {
  let component: QuickerGuideComponent;
  let fixture: ComponentFixture<QuickerGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickerGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickerGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
