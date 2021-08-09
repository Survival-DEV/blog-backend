import { Seeder, Factory } from 'typeorm-seeding';
import { CategoryEntity } from '../entities/category.entity';

export class SeedCategories implements Seeder {
  async run(factory: Factory): Promise<void> {
    console.log('Seeding users...');
    await factory(CategoryEntity)().createMany(5);
  }
}
