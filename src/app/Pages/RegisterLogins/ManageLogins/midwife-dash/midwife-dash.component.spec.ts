import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeDashComponent } from './midwife-dash.component';

describe('MidwifeDashComponent', () => {
  let component: MidwifeDashComponent;
  let fixture: ComponentFixture<MidwifeDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidwifeDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
