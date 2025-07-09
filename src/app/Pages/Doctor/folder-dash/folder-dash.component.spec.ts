import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderDashComponent } from './folder-dash.component';

describe('FolderDashComponent', () => {
  let component: FolderDashComponent;
  let fixture: ComponentFixture<FolderDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
