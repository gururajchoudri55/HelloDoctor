import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseSupportComponent } from './nurse-support.component';

describe('NurseSupportComponent', () => {
  let component: NurseSupportComponent;
  let fixture: ComponentFixture<NurseSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
