import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceMasterDetailsComponent } from './province-master-details.component';

describe('ProvinceMasterDetailsComponent', () => {
  let component: ProvinceMasterDetailsComponent;
  let fixture: ComponentFixture<ProvinceMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinceMasterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
