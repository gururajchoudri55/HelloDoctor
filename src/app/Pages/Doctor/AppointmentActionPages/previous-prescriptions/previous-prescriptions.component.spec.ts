import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousPrescriptionsComponent } from './previous-prescriptions.component';

describe('PreviousPrescriptionsComponent', () => {
  let component: PreviousPrescriptionsComponent;
  let fixture: ComponentFixture<PreviousPrescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousPrescriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
