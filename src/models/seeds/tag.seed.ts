import { Factory, Seeder } from 'typeorm-seeding';
import { TagEntity } from '@entities/tag.entity';

export class SeedCategories implements Seeder {
  async run(factory: Factory): Promise<void> {
    console.log('Seeding tags...');
    await factory(TagEntity)().createMany(5);
  }
}
