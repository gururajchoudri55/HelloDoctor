import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMenumappingComponent } from './role-menumapping.component';

describe('RoleMenumappingComponent', () => {
  let component: RoleMenumappingComponent;
  let fixture: ComponentFixture<RoleMenumappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleMenumappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleMenumappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
