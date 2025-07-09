import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpHomepageDetailsComponent } from './sp-homepage-details.component';

describe('SpHomepageDetailsComponent', () => {
  let component: SpHomepageDetailsComponent;
  let fixture: ComponentFixture<SpHomepageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpHomepageDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpHomepageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
