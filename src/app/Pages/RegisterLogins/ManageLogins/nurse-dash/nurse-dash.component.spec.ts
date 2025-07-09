import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseDashComponent } from './nurse-dash.component';

describe('NurseDashComponent', () => {
  let component: NurseDashComponent;
  let fixture: ComponentFixture<NurseDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
