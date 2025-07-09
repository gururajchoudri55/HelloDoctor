import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentRefferalsComponent } from './sent-refferals.component';

describe('SentRefferalsComponent', () => {
  let component: SentRefferalsComponent;
  let fixture: ComponentFixture<SentRefferalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentRefferalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentRefferalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
