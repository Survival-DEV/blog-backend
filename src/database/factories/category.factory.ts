import Faker, { fake } from 'faker';
import { CategoryEntity } from '../entities/category.entity';
import { define } from 'typeorm-seeding';

define(CategoryEntity, (faker: typeof Faker) => {
  console.log('category.factory.ts is running...');
  const user = new CategoryEntity();
  user.title = faker.name.title();
  user.meta_title = faker.random.words();
  user.slug = faker.lorem.slug();

  return user;
});
