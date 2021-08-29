import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { TagEntity } from '../entities/tag.entity';

define(TagEntity, (faker: typeof Faker) => {
  console.log('tag.factory.ts is running...');
  const tag = new TagEntity();
  tag.title = faker.name.title();
  tag.meta_title = faker.lorem.words(20);
  tag.slug = faker.lorem.slug(10);

  return tag;
});
