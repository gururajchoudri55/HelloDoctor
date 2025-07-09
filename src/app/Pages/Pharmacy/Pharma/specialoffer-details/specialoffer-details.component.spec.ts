import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialofferDetailsComponent } from './specialoffer-details.component';

describe('SpecialofferDetailsComponent', () => {
  let component: SpecialofferDetailsComponent;
  let fixture: ComponentFixture<SpecialofferDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialofferDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialofferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
