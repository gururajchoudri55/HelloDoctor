import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsdashComponent } from './productsdash.component';

describe('ProductsdashComponent', () => {
  let component: ProductsdashComponent;
  let fixture: ComponentFixture<ProductsdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
