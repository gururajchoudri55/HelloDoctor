import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQnewComponent } from './faqnew.component';

describe('FAQnewComponent', () => {
  let component: FAQnewComponent;
  let fixture: ComponentFixture<FAQnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAQnewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FAQnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
