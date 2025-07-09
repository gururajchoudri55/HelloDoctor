import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponseredArticleDashboardComponent } from './sponsered-article-dashboard.component';

describe('SponseredArticleDashboardComponent', () => {
  let component: SponseredArticleDashboardComponent;
  let fixture: ComponentFixture<SponseredArticleDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponseredArticleDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponseredArticleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
