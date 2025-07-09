import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsPromocodeMasterComponent } from './vitals-promocode-master.component';

describe('VitalsPromocodeMasterComponent', () => {
  let component: VitalsPromocodeMasterComponent;
  let fixture: ComponentFixture<VitalsPromocodeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalsPromocodeMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalsPromocodeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
