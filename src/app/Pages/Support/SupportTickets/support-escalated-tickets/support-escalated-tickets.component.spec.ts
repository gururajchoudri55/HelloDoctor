import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportEscalatedTicketsComponent } from './support-escalated-tickets.component';

describe('SupportEscalatedTicketsComponent', () => {
  let component: SupportEscalatedTicketsComponent;
  let fixture: ComponentFixture<SupportEscalatedTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportEscalatedTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportEscalatedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
