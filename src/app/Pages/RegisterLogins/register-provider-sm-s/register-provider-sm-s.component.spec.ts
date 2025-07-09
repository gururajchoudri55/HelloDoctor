import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProviderSmSComponent } from './register-provider-sm-s.component';

describe('RegisterProviderSmSComponent', () => {
  let component: RegisterProviderSmSComponent;
  let fixture: ComponentFixture<RegisterProviderSmSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterProviderSmSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterProviderSmSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
