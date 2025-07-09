import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueDaignosticdashboardComponent } from './revenue-daignosticdashboard.component';

describe('RevenueDaignosticdashboardComponent', () => {
  let component: RevenueDaignosticdashboardComponent;
  let fixture: ComponentFixture<RevenueDaignosticdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueDaignosticdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueDaignosticdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
