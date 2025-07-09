import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntensiveLoaderComponent } from './intensive-loader.component';

describe('IntensiveLoaderComponent', () => {
  let component: IntensiveLoaderComponent;
  let fixture: ComponentFixture<IntensiveLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntensiveLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntensiveLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
