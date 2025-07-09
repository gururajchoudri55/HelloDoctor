import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDeutilisationComponent } from './report-deutilisation.component';

describe('ReportDeutilisationComponent', () => {
  let component: ReportDeutilisationComponent;
  let fixture: ComponentFixture<ReportDeutilisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDeutilisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDeutilisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
