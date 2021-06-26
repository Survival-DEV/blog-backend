import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from '../../src/blogs/blogs.service';
import { BlogsController } from '../../src/blogs/blogs.controller';

describe('BlogsController', () => {
  let controller: BlogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogsController],
      providers: [
        {
          provide: BlogService,
          useValue: {
            findAllBlogs: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BlogsController>(BlogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
