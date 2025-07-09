import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMenumappingDetailsComponent } from './role-menumapping-details.component';

describe('RoleMenumappingDetailsComponent', () => {
  let component: RoleMenumappingDetailsComponent;
  let fixture: ComponentFixture<RoleMenumappingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleMenumappingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleMenumappingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
