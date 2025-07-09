import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkForRegComponent } from './link-for-reg.component';

describe('LinkForRegComponent', () => {
  let component: LinkForRegComponent;
  let fixture: ComponentFixture<LinkForRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkForRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkForRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
