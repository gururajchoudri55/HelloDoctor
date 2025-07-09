import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRecpPwdComponent } from './change-recp-pwd.component';

describe('ChangeRecpPwdComponent', () => {
  let component: ChangeRecpPwdComponent;
  let fixture: ComponentFixture<ChangeRecpPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeRecpPwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRecpPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
