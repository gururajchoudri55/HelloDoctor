import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeServiceDetailsComponent } from './midwife-service-details.component';

describe('MidwifeServiceDetailsComponent', () => {
  let component: MidwifeServiceDetailsComponent;
  let fixture: ComponentFixture<MidwifeServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidwifeServiceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
