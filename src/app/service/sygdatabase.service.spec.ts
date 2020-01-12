import { TestBed } from '@angular/core/testing';

import { SYGDatabaseService } from './sygdatabase.service';

describe('SYGDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SYGDatabaseService = TestBed.get(SYGDatabaseService);
    expect(service).toBeTruthy();
  });
}); 
