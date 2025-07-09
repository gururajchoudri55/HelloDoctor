import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifePlanningComponent } from './midwife-planning.component';

describe('MidwifePlanningComponent', () => {
  let component: MidwifePlanningComponent;
  let fixture: ComponentFixture<MidwifePlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidwifePlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
