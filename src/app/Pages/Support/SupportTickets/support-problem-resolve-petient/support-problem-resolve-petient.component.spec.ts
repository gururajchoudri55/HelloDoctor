import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportProblemResolvePetientComponent } from './support-problem-resolve-petient.component';

describe('SupportProblemResolvePetientComponent', () => {
  let component: SupportProblemResolvePetientComponent;
  let fixture: ComponentFixture<SupportProblemResolvePetientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportProblemResolvePetientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportProblemResolvePetientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
