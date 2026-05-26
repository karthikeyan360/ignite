import { TestBed } from '@angular/core/testing';

import { TypeTwoVisualizationService } from './type-two-visualization.service';

describe('TypeTwoVisualizationService', () => {
  let service: TypeTwoVisualizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeTwoVisualizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
