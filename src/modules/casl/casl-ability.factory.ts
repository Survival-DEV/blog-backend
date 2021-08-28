import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { BlogEntity } from 'src/models/entities/blog.entity';
import { UserEntity } from 'src/models/entities/user.entity';
import { Action } from '../auth/decorators/actions.enum';
import { Role } from '../auth/decorators/roles.enum';

type Subjects = InferSubjects<typeof BlogEntity | typeof UserEntity> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.role === Role.Admin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');
    }

    can(Action.Update, BlogEntity, { author_id: user.id });
    cannot(Action.Delete, BlogEntity, { is_draft: false });

    return build({
      detectSubjectType: item =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
