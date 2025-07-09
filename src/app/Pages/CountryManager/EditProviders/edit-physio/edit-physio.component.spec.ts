import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhysioComponent } from './edit-physio.component';

describe('EditPhysioComponent', () => {
  let component: EditPhysioComponent;
  let fixture: ComponentFixture<EditPhysioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPhysioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhysioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
