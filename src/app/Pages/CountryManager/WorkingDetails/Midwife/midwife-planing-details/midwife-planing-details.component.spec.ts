import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifePlaningDetailsComponent } from './midwife-planing-details.component';

describe('MidwifePlaningDetailsComponent', () => {
  let component: MidwifePlaningDetailsComponent;
  let fixture: ComponentFixture<MidwifePlaningDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidwifePlaningDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifePlaningDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
