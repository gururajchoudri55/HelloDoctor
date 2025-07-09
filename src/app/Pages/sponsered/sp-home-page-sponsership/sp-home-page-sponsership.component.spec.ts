import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpHomePageSponsershipComponent } from './sp-home-page-sponsership.component';

describe('SpHomePageSponsershipComponent', () => {
  let component: SpHomePageSponsershipComponent;
  let fixture: ComponentFixture<SpHomePageSponsershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpHomePageSponsershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpHomePageSponsershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
