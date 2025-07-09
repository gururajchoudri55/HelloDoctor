import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMEComponent } from './dme.component';

describe('DMEComponent', () => {
  let component: DMEComponent;
  let fixture: ComponentFixture<DMEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DMEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
