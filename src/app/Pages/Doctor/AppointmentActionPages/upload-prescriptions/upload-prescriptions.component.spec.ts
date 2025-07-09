import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPrescriptionsComponent } from './upload-prescriptions.component';

describe('UploadPrescriptionsComponent', () => {
  let component: UploadPrescriptionsComponent;
  let fixture: ComponentFixture<UploadPrescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPrescriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
