import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseChangePwdComponent } from './nurse-change-pwd.component';

describe('NurseChangePwdComponent', () => {
  let component: NurseChangePwdComponent;
  let fixture: ComponentFixture<NurseChangePwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseChangePwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
