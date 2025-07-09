import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryMasterDetailsComponent } from './country-master-details.component';

describe('CountryMasterDetailsComponent', () => {
  let component: CountryMasterDetailsComponent;
  let fixture: ComponentFixture<CountryMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryMasterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
