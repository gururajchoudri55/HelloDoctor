import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedUsersComponent } from './rejected-users.component';

describe('RejectedUsersComponent', () => {
  let component: RejectedUsersComponent;
  let fixture: ComponentFixture<RejectedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
