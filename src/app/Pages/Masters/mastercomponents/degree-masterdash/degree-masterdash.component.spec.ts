import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeMasterdashComponent } from './degree-masterdash.component';

describe('DegreeMasterdashComponent', () => {
  let component: DegreeMasterdashComponent;
  let fixture: ComponentFixture<DegreeMasterdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegreeMasterdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreeMasterdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
