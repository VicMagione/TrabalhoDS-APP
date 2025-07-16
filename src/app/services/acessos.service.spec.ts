import { TestBed } from '@angular/core/testing';

import { AcessosService } from './acessos.service';

describe('AcessosService', () => {
  let service: AcessosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcessosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
