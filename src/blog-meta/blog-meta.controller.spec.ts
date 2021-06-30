import { Test, TestingModule } from '@nestjs/testing';
import { BlogMetaController } from './blog-meta.controller';
import { BlogMetaService } from './blog-meta.service';

describe('BlogMetaController', () => {
  let controller: BlogMetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogMetaController],
      providers: [
        {
          provide: BlogMetaService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BlogMetaController>(BlogMetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
