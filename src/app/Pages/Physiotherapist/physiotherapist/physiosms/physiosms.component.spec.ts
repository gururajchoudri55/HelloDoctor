import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiosmsComponent } from './physiosms.component';

describe('PhysiosmsComponent', () => {
  let component: PhysiosmsComponent;
  let fixture: ComponentFixture<PhysiosmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysiosmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiosmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
