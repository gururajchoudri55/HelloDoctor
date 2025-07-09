import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyChatComponent } from './pharmacy-chat.component';

describe('PharmacyChatComponent', () => {
  let component: PharmacyChatComponent;
  let fixture: ComponentFixture<PharmacyChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
