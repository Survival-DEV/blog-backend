import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../core/auth/auth.controller';
import { AuthService } from '../../core/auth/auth.service';
import { UsersService } from '../../core/users/users.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
