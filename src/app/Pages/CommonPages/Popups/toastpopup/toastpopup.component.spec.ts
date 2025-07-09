import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastpopupComponent } from './toastpopup.component';

describe('ToastpopupComponent', () => {
  let component: ToastpopupComponent;
  let fixture: ComponentFixture<ToastpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastpopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
