import { TestBed } from '@angular/core/testing';

import { MesdonneescontactService } from './mesdonneescontact.service';

describe('MesdonneescontactService', () => {
  let service: MesdonneescontactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesdonneescontactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
