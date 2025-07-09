import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedUsersComponent } from './approved-users.component';

describe('ApprovedUsersComponent', () => {
  let component: ApprovedUsersComponent;
  let fixture: ComponentFixture<ApprovedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
