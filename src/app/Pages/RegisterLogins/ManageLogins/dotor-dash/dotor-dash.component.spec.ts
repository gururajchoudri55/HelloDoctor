import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotorDashComponent } from './dotor-dash.component';

describe('DotorDashComponent', () => {
  let component: DotorDashComponent;
  let fixture: ComponentFixture<DotorDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotorDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DotorDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
