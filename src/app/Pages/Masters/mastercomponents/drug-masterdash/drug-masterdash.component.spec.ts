import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugMasterdashComponent } from './drug-masterdash.component';

describe('DrugMasterdashComponent', () => {
  let component: DrugMasterdashComponent;
  let fixture: ComponentFixture<DrugMasterdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugMasterdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugMasterdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
