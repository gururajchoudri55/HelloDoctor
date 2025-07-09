import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseServiceDetailsComponent } from './nurse-service-details.component';

describe('NurseServiceDetailsComponent', () => {
  let component: NurseServiceDetailsComponent;
  let fixture: ComponentFixture<NurseServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseServiceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
