import { TestBed } from '@angular/core/testing';

import { PermisosService } from '../permisos/permisos';

describe('Permisos', () => {
  let service: PermisosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
