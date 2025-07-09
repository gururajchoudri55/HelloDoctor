import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependentRecepDetailsComponent } from './independent-recep-details.component';

describe('IndependentRecepDetailsComponent', () => {
  let component: IndependentRecepDetailsComponent;
  let fixture: ComponentFixture<IndependentRecepDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndependentRecepDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependentRecepDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
