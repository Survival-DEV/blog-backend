import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../core/users/users.module';
import { AuthModule } from '../core/auth/auth.module';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';


describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UsersModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
