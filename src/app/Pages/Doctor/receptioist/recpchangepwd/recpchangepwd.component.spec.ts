import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecpchangepwdComponent } from './recpchangepwd.component';

describe('RecpchangepwdComponent', () => {
  let component: RecpchangepwdComponent;
  let fixture: ComponentFixture<RecpchangepwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecpchangepwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecpchangepwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
