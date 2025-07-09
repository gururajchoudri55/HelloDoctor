import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseEmrComponent } from './nurse-emr.component';

describe('NurseEmrComponent', () => {
  let component: NurseEmrComponent;
  let fixture: ComponentFixture<NurseEmrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseEmrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseEmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
