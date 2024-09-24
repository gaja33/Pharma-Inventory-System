import { TestBed } from '@angular/core/testing';

import { MedicineTypesService } from './medicine-types.service';

describe('MedicineTypesService', () => {
  let service: MedicineTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
