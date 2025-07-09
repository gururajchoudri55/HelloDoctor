import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeAgendaComponent } from './midwife-agenda.component';

describe('MidwifeAgendaComponent', () => {
  let component: MidwifeAgendaComponent;
  let fixture: ComponentFixture<MidwifeAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidwifeAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
