import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkFordashComponent } from './link-fordash.component';

describe('LinkFordashComponent', () => {
  let component: LinkFordashComponent;
  let fixture: ComponentFixture<LinkFordashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkFordashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkFordashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
