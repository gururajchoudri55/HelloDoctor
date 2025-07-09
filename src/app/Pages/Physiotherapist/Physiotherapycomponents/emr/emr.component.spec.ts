import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMRComponent } from './emr.component';

describe('EMRComponent', () => {
  let component: EMRComponent;
  let fixture: ComponentFixture<EMRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EMRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EMRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
