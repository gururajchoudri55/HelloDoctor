import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseSupportDashComponent } from './nurse-support-dash.component';

describe('NurseSupportDashComponent', () => {
  let component: NurseSupportDashComponent;
  let fixture: ComponentFixture<NurseSupportDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseSupportDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseSupportDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
