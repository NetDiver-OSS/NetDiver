import { Test, TestingModule } from '@nestjs/testing';
import { NettoolsService } from './nettools.service';

describe('NettoolsService', () => {
  let service: NettoolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NettoolsService],
    }).compile();

    service = module.get<NettoolsService>(NettoolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
