import { TestBed } from '@angular/core/testing';

import { AlertcontrolService } from './alertcontrol.service';

describe('AlertcontrolService', () => {
  let service: AlertcontrolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertcontrolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
