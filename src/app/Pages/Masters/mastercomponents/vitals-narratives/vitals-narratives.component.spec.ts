import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsNarrativesComponent } from './vitals-narratives.component';

describe('VitalsNarrativesComponent', () => {
  let component: VitalsNarrativesComponent;
  let fixture: ComponentFixture<VitalsNarrativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalsNarrativesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalsNarrativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
