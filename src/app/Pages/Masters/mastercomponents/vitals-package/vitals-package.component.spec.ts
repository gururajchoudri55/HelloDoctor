import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsPackageComponent } from './vitals-package.component';

describe('VitalsPackageComponent', () => {
  let component: VitalsPackageComponent;
  let fixture: ComponentFixture<VitalsPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalsPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalsPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
