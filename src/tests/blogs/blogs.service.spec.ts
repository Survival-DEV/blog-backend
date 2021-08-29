import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from '../../core/blogs/blogs.controller';
import { BlogService } from '../../core/blogs/blogs.service';

describe('BlogsService', () => {
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BlogService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = await module.resolve(BlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
