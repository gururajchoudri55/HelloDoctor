import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocChangePwdComponent } from './doc-change-pwd.component';

describe('DocChangePwdComponent', () => {
  let component: DocChangePwdComponent;
  let fixture: ComponentFixture<DocChangePwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocChangePwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
