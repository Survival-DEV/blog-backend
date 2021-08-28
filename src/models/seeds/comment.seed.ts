import { Factory, Seeder } from 'typeorm-seeding';
import { CommentEntity } from '../entities/comment.entity';

export class SeedCategories implements Seeder {
  async run(factory: Factory): Promise<void> {
    console.log('Seeding comments...');
    await factory(CommentEntity)().createMany(5);
  }
}
