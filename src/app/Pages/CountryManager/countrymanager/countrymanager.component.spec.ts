import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrymanagerComponent } from './countrymanager.component';

describe('CountrymanagerComponent', () => {
  let component: CountrymanagerComponent;
  let fixture: ComponentFixture<CountrymanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountrymanagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrymanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
