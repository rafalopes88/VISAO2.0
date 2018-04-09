import { TestBed, inject } from '@angular/core/testing';

import { InfoGeralService } from './info-geral.service';

describe('InfoGeralService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoGeralService]
    });
  });

  it('should be created', inject([InfoGeralService], (service: InfoGeralService) => {
    expect(service).toBeTruthy();
  }));
});
