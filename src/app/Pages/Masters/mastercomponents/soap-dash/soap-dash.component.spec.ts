import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoapDashComponent } from './soap-dash.component';

describe('SoapDashComponent', () => {
  let component: SoapDashComponent;
  let fixture: ComponentFixture<SoapDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoapDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoapDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
