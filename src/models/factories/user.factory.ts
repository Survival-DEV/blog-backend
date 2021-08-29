import * as Faker from 'faker';
import * as Factory  from 'typeorm-seeding';
import { UserEntity } from '../entities/user.entity';

Factory.define(UserEntity, (faker: typeof Faker) => {
  console.log('user.factory.ts is running...');
  const user = new UserEntity();
  user.username = faker.name.findName();
  user.first_name = faker.name.firstName();
  user.last_name = faker.name.lastName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.bio = faker.lorem.words(30);
  user.github = faker.lorem.slug(8);
  user.linked_in = faker.lorem.slug(10);

  return user;
});

export default Factory
