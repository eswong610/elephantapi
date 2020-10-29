import { Test, TestingModule } from '@nestjs/testing';
import { EducatorRatingController } from './educator-rating.controller';

describe('EducatorRatingController', () => {
  let controller: EducatorRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducatorRatingController],
    }).compile();

    controller = module.get<EducatorRatingController>(EducatorRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
