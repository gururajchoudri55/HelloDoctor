import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitymasterComponent } from './citymaster.component';

describe('CitymasterComponent', () => {
  let component: CitymasterComponent;
  let fixture: ComponentFixture<CitymasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitymasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
