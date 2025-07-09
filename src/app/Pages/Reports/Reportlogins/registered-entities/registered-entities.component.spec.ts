import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredEntitiesComponent } from './registered-entities.component';

describe('RegisteredEntitiesComponent', () => {
  let component: RegisteredEntitiesComponent;
  let fixture: ComponentFixture<RegisteredEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredEntitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
