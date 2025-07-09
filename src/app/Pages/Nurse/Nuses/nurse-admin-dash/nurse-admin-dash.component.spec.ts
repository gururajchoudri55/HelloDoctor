import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseAdminDashComponent } from './nurse-admin-dash.component';

describe('NurseAdminDashComponent', () => {
  let component: NurseAdminDashComponent;
  let fixture: ComponentFixture<NurseAdminDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseAdminDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseAdminDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
