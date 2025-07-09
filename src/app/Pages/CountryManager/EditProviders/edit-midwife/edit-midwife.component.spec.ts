import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMidwifeComponent } from './edit-midwife.component';

describe('EditMidwifeComponent', () => {
  let component: EditMidwifeComponent;
  let fixture: ComponentFixture<EditMidwifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMidwifeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMidwifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
