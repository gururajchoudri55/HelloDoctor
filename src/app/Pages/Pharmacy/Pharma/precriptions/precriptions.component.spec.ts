import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecriptionsComponent } from './precriptions.component';

describe('PrecriptionsComponent', () => {
  let component: PrecriptionsComponent;
  let fixture: ComponentFixture<PrecriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
