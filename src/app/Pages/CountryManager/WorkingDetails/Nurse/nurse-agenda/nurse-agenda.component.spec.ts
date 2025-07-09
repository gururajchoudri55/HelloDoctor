import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseAgendaComponent } from './nurse-agenda.component';

describe('NurseAgendaComponent', () => {
  let component: NurseAgendaComponent;
  let fixture: ComponentFixture<NurseAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
