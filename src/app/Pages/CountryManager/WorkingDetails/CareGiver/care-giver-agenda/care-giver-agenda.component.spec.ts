import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareGiverAgendaComponent } from './care-giver-agenda.component';

describe('CareGiverAgendaComponent', () => {
  let component: CareGiverAgendaComponent;
  let fixture: ComponentFixture<CareGiverAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareGiverAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareGiverAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
