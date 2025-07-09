import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationSettingsComponent } from './cancellation-settings.component';

describe('CancellationSettingsComponent', () => {
  let component: CancellationSettingsComponent;
  let fixture: ComponentFixture<CancellationSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancellationSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
