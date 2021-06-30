import { Test, TestingModule } from '@nestjs/testing';
import { BlogMetaService } from './blog-meta.service';

describe('BlogMetaService', () => {
  let service: BlogMetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BlogMetaService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BlogMetaService>(BlogMetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
