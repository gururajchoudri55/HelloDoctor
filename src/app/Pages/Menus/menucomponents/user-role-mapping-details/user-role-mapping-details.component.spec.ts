import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleMappingDetailsComponent } from './user-role-mapping-details.component';

describe('UserRoleMappingDetailsComponent', () => {
  let component: UserRoleMappingDetailsComponent;
  let fixture: ComponentFixture<UserRoleMappingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRoleMappingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleMappingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
