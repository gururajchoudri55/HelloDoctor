import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCopanyComponent } from './delivery-copany.component';

describe('DeliveryCopanyComponent', () => {
  let component: DeliveryCopanyComponent;
  let fixture: ComponentFixture<DeliveryCopanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryCopanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCopanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
