import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocRecpProfileComponent } from './doc-recp-profile.component';

describe('DocRecpProfileComponent', () => {
  let component: DocRecpProfileComponent;
  let fixture: ComponentFixture<DocRecpProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocRecpProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocRecpProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
