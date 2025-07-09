import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsPackageMasterComponent } from './vitals-package-master.component';

describe('VitalsPackageMasterComponent', () => {
  let component: VitalsPackageMasterComponent;
  let fixture: ComponentFixture<VitalsPackageMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalsPackageMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalsPackageMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
