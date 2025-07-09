import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicsdashComponent } from './clinicsdash.component';

describe('ClinicsdashComponent', () => {
  let component: ClinicsdashComponent;
  let fixture: ComponentFixture<ClinicsdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicsdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicsdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
