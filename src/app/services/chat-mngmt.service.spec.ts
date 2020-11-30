import { TestBed } from '@angular/core/testing';

import { ChatMngmtService } from './chat-mngmt.service';

describe('ChatMngmtService', () => {
  let service: ChatMngmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatMngmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
