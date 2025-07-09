import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeServiceComponent } from './midwife-service.component';

describe('MidwifeServiceComponent', () => {
  let component: MidwifeServiceComponent;
  let fixture: ComponentFixture<MidwifeServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidwifeServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
