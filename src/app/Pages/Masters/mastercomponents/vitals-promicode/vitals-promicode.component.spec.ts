import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsPromicodeComponent } from './vitals-promicode.component';

describe('VitalsPromicodeComponent', () => {
  let component: VitalsPromicodeComponent;
  let fixture: ComponentFixture<VitalsPromicodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalsPromicodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalsPromicodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
