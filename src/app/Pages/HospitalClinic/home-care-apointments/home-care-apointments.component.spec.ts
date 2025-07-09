import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCareApointmentsComponent } from './home-care-apointments.component';

describe('HomeCareApointmentsComponent', () => {
  let component: HomeCareApointmentsComponent;
  let fixture: ComponentFixture<HomeCareApointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCareApointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCareApointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
