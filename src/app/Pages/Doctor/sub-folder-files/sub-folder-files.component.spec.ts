import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubFolderFilesComponent } from './sub-folder-files.component';

describe('SubFolderFilesComponent', () => {
  let component: SubFolderFilesComponent;
  let fixture: ComponentFixture<SubFolderFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubFolderFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubFolderFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
