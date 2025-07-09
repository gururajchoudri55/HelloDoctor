import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategorydashComponent } from './sub-categorydash.component';

describe('SubCategorydashComponent', () => {
  let component: SubCategorydashComponent;
  let fixture: ComponentFixture<SubCategorydashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategorydashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategorydashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
