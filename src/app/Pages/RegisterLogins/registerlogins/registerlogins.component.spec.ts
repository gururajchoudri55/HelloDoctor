import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterloginsComponent } from './registerlogins.component';

describe('RegisterloginsComponent', () => {
  let component: RegisterloginsComponent;
  let fixture: ComponentFixture<RegisterloginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterloginsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterloginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
