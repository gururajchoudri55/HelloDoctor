import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpmEmrComponent } from './npm-emr.component';

describe('NpmEmrComponent', () => {
  let component: NpmEmrComponent;
  let fixture: ComponentFixture<NpmEmrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpmEmrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NpmEmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
