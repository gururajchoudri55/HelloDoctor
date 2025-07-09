import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysubfolderfilesComponent } from './mysubfolderfiles.component';

describe('MysubfolderfilesComponent', () => {
  let component: MysubfolderfilesComponent;
  let fixture: ComponentFixture<MysubfolderfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MysubfolderfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MysubfolderfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
