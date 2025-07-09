import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsNarrativesMasterComponent } from './vitals-narratives-master.component';

describe('VitalsNarrativesMasterComponent', () => {
  let component: VitalsNarrativesMasterComponent;
  let fixture: ComponentFixture<VitalsNarrativesMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalsNarrativesMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalsNarrativesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
