import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportProviderTicketsComponent } from './support-provider-tickets.component';

describe('SupportProviderTicketsComponent', () => {
  let component: SupportProviderTicketsComponent;
  let fixture: ComponentFixture<SupportProviderTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportProviderTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportProviderTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
