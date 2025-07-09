import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportPatientTicketsComponent } from './support-patient-tickets.component';

describe('SupportPatientTicketsComponent', () => {
  let component: SupportPatientTicketsComponent;
  let fixture: ComponentFixture<SupportPatientTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportPatientTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportPatientTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
