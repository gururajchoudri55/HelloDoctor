import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponseredArticleRegistrationComponent } from './sponsered-article-registration.component';

describe('SponseredArticleRegistrationComponent', () => {
  let component: SponseredArticleRegistrationComponent;
  let fixture: ComponentFixture<SponseredArticleRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponseredArticleRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponseredArticleRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
