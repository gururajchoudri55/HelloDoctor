import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycalenderComponent } from './mycalender.component';

describe('MycalenderComponent', () => {
  let component: MycalenderComponent;
  let fixture: ComponentFixture<MycalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MycalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
