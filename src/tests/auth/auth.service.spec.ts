import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtConstants } from '../../constants';
import { UsersModule } from '../../core/users/users.module';
import { AuthService } from '../../core/auth/auth.service';
import { LocalStrategy } from '../../core/auth/strategies/local.strategy';
import { JwtStrategy } from '../../core/auth/strategies/jwt.strategy';

const { secret, expiresIn } = JwtConstants;

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: secret || 'secerto',
          signOptions: { expiresIn },
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('validateUser', () => {
    let service: AuthService;

    beforeEach(async () => {
      const moduleRef: TestingModule = await Test.createTestingModule({
        imports: [
          UsersModule,
          PassportModule,
          JwtModule.register({
            secret: JwtConstants.secret,
            signOptions: { expiresIn: '60s' },
          }),
        ],
        providers: [AuthService, LocalStrategy, JwtStrategy],
      }).compile();

      service = moduleRef.get<AuthService>(AuthService);
    });

    it('should return a user object when credentials are valid', async () => {
      const res = await service.validateUser('jood3@gmail.com', '123456789');
      expect(res.email).toEqual(3);
    });

    it('should return null when credentials are invalid', async () => {
      const res = await service.validateUser('xxx', 'xxx');
      expect(res).toBeNull();
    });
  });

  describe('validateLogin', () => {
    let service: AuthService;

    beforeEach(async () => {
      const moduleRef: TestingModule = await Test.createTestingModule({
        imports: [
          UsersModule,
          PassportModule,
          JwtModule.register({
            secret: JwtConstants.secret,
            signOptions: { expiresIn: '60s' },
          }),
        ],
        providers: [AuthService, LocalStrategy, JwtStrategy],
      }).compile();

      service = moduleRef.get<AuthService>(AuthService);
    });

    it('should return JWT object when credentials are valid', async () => {
      const res = await service.login({
        email: 'jood@gmail.com',
        password: '123456789',
        firstName: 'jood',
      });
      expect(res.accessToken).toBeDefined();
    });
  });
});
