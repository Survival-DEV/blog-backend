import { Factory, Seeder } from 'typeorm-seeding';
import { BlogEntity } from '../entities/blog.entity';

export class SeedCategories implements Seeder {
  async run(factory: Factory): Promise<void> {
    console.log('Seeding blogs...');
    await factory(BlogEntity)().createMany(5);
  }
}
