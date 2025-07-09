import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPdfsComponent } from './check-pdfs.component';

describe('CheckPdfsComponent', () => {
  let component: CheckPdfsComponent;
  let fixture: ComponentFixture<CheckPdfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckPdfsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPdfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
