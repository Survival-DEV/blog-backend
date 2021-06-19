import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from '../service/blogs.service';
import { BlogsController } from './blogs.controller';

describe('BlogsController', () => {
  let controller: BlogsController;
  let service: BlogService;

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
