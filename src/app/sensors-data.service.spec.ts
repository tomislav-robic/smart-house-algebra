import { TestBed } from '@angular/core/testing';

import { SensorsDataService } from './sensors-data.service';

describe('SensorsDataService', () => {
  let service: SensorsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
