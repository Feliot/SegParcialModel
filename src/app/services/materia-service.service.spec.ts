import { TestBed } from '@angular/core/testing';

import { MateriaServiceService } from './materia-service.service';

describe('MateriaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MateriaServiceService = TestBed.get(MateriaServiceService);
    expect(service).toBeTruthy();
  });
});
