import { TestBed } from '@angular/core/testing';

import { BoardsFactoryService } from './boards-factory.service';

describe('BoardsFactoryService', () => {
  let service: BoardsFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardsFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
