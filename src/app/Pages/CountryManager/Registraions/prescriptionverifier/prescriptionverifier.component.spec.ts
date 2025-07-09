import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionverifierComponent } from './prescriptionverifier.component';

describe('PrescriptionverifierComponent', () => {
  let component: PrescriptionverifierComponent;
  let fixture: ComponentFixture<PrescriptionverifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionverifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionverifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
