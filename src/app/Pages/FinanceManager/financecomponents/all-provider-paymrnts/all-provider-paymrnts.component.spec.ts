import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProviderPaymrntsComponent } from './all-provider-paymrnts.component';

describe('AllProviderPaymrntsComponent', () => {
  let component: AllProviderPaymrntsComponent;
  let fixture: ComponentFixture<AllProviderPaymrntsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProviderPaymrntsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProviderPaymrntsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
