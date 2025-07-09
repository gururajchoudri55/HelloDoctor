import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeDetailsComponent } from './midwife-details.component';

describe('MidwifeDetailsComponent', () => {
  let component: MidwifeDetailsComponent;
  let fixture: ComponentFixture<MidwifeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidwifeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
