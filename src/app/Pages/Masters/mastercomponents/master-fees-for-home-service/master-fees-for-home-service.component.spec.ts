import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFeesForHomeServiceComponent } from './master-fees-for-home-service.component';

describe('MasterFeesForHomeServiceComponent', () => {
  let component: MasterFeesForHomeServiceComponent;
  let fixture: ComponentFixture<MasterFeesForHomeServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterFeesForHomeServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFeesForHomeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
