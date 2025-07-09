import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuickGuideComponent } from './add-quick-guide.component';

describe('AddQuickGuideComponent', () => {
  let component: AddQuickGuideComponent;
  let fixture: ComponentFixture<AddQuickGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuickGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuickGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
