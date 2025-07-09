import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvincemasterComponent } from './provincemaster.component';

describe('ProvincemasterComponent', () => {
  let component: ProvincemasterComponent;
  let fixture: ComponentFixture<ProvincemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvincemasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvincemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
