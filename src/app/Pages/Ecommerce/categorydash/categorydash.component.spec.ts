import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorydashComponent } from './categorydash.component';

describe('CategorydashComponent', () => {
  let component: CategorydashComponent;
  let fixture: ComponentFixture<CategorydashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorydashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorydashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
