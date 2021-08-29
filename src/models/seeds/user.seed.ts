import { Factory, Seeder } from "typeorm-seeding";
import { UserEntity } from "../entities/user.entity";

export class SeedCategories implements Seeder {
  async run(factory: Factory): Promise<void> {
    console.log('Seeding users...');
    await factory(UserEntity)().createMany(5);
  }
}
