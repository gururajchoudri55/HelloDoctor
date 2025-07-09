import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeComponent } from './midwife.component';

describe('MidwifeComponent', () => {
  let component: MidwifeComponent;
  let fixture: ComponentFixture<MidwifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidwifeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
