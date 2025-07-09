import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickerguideDetailsComponent } from './quickerguide-details.component';

describe('QuickerguideDetailsComponent', () => {
  let component: QuickerguideDetailsComponent;
  let fixture: ComponentFixture<QuickerguideDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickerguideDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickerguideDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
