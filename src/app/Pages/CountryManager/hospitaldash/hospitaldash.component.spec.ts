import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitaldashComponent } from './hospitaldash.component';

describe('HospitaldashComponent', () => {
  let component: HospitaldashComponent;
  let fixture: ComponentFixture<HospitaldashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitaldashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitaldashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
