import { TestBed } from '@angular/core/testing';

import { JsonDataResolver } from './json-data.resolver';

describe('JsonDataResolver', () => {
  let resolver: JsonDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(JsonDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
