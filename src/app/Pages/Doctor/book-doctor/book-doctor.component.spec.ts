import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDoctorComponent } from './book-doctor.component';

describe('BookDoctorComponent', () => {
  let component: BookDoctorComponent;
  let fixture: ComponentFixture<BookDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
