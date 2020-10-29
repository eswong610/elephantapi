import { Test, TestingModule } from '@nestjs/testing';
import { EducatorRatingService } from './educator-rating.service';

describe('EducatorRatingService', () => {
  let service: EducatorRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducatorRatingService],
    }).compile();

    service = module.get<EducatorRatingService>(EducatorRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
