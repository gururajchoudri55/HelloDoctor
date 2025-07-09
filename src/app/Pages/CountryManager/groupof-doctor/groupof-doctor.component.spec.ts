import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupofDoctorComponent } from './groupof-doctor.component';

describe('GroupofDoctorComponent', () => {
  let component: GroupofDoctorComponent;
  let fixture: ComponentFixture<GroupofDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupofDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupofDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
