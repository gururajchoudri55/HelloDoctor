import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptindashComponent } from './prescriptindash.component';

describe('PrescriptindashComponent', () => {
  let component: PrescriptindashComponent;
  let fixture: ComponentFixture<PrescriptindashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptindashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptindashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
