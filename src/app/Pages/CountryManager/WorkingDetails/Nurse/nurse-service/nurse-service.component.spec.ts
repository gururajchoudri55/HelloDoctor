import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseServiceComponent } from './nurse-service.component';

describe('NurseServiceComponent', () => {
  let component: NurseServiceComponent;
  let fixture: ComponentFixture<NurseServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
