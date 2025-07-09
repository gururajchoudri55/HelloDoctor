import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalcertificateComponent } from './medicalcertificate.component';

describe('MedicalcertificateComponent', () => {
  let component: MedicalcertificateComponent;
  let fixture: ComponentFixture<MedicalcertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalcertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalcertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
