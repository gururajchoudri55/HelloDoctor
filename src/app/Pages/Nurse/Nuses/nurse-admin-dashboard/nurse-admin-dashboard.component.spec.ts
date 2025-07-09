import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseAdminDashboardComponent } from './nurse-admin-dashboard.component';

describe('NurseAdminDashboardComponent', () => {
  let component: NurseAdminDashboardComponent;
  let fixture: ComponentFixture<NurseAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseAdminDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
