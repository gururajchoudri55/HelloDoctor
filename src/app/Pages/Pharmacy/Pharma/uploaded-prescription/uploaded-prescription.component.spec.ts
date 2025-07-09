import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedPrescriptionComponent } from './uploaded-prescription.component';

describe('UploadedPrescriptionComponent', () => {
  let component: UploadedPrescriptionComponent;
  let fixture: ComponentFixture<UploadedPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedPrescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
