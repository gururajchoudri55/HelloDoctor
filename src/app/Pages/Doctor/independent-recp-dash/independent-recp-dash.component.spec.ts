import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependentRecpDashComponent } from './independent-recp-dash.component';

describe('IndependentRecpDashComponent', () => {
  let component: IndependentRecpDashComponent;
  let fixture: ComponentFixture<IndependentRecpDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndependentRecpDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependentRecpDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
