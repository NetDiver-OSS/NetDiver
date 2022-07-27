import { Test, TestingModule } from '@nestjs/testing';
import { NetamService } from './netam.service';

describe('NetamService', () => {
  let service: NetamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetamService],
    }).compile();

    service = module.get<NetamService>(NetamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
