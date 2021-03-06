import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../core/users/users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

// describe('USER REGISTER', () => {
//   it('should new user', async () => {
//     const user: any = await Factory.factory(UserEntity).make();
//  });
// });
