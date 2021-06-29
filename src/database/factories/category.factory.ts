import Faker from 'faker';
import { CategoryEntity } from '../entities/category.entity';
import { define } from 'typeorm-seeding';

define(CategoryEntity, (faker: typeof Faker) => {
  console.log('category.factory.ts is running...');
  const category = new CategoryEntity();
  category.title = faker.name.title();
  category.meta_title = faker.random.words();
  category.slug = faker.lorem.slug();

  return category;
});
