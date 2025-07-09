import { TestBed } from '@angular/core/testing';

import { MidwifeService } from './midwife.service';

describe('MidwifeService', () => {
  let service: MidwifeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MidwifeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
