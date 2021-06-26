import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from '../../src/blogs/blogs.controller';
import { BlogService } from '../../src/blogs/blogs.service';

describe('BlogsService', () => {
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogsController],
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
