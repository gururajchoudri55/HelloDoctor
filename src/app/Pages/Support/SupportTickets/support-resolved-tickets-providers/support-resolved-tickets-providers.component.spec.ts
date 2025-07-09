import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportResolvedTicketsProvidersComponent } from './support-resolved-tickets-providers.component';

describe('SupportResolvedTicketsProvidersComponent', () => {
  let component: SupportResolvedTicketsProvidersComponent;
  let fixture: ComponentFixture<SupportResolvedTicketsProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportResolvedTicketsProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportResolvedTicketsProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
