import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponseredComponent } from './sponsered.component';

describe('SponseredComponent', () => {
  let component: SponseredComponent;
  let fixture: ComponentFixture<SponseredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponseredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponseredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
