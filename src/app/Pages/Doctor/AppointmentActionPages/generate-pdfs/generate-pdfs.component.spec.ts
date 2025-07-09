import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePdfsComponent } from './generate-pdfs.component';

describe('GeneratePdfsComponent', () => {
  let component: GeneratePdfsComponent;
  let fixture: ComponentFixture<GeneratePdfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePdfsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePdfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
