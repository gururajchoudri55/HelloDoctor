import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMasterDetailsComponent } from './service-master-details.component';

describe('ServiceMasterDetailsComponent', () => {
  let component: ServiceMasterDetailsComponent;
  let fixture: ComponentFixture<ServiceMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceMasterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
