import { Resolver, Query } from '@nestjs/graphql';
import { User } from './user.model';

@Resolver(() => User)
export class UserResolver {
  // Rename the property to something like userList
  private userList = [
    { id: '1', username: 'john', email: 'john@example.com' },
    { id: '2', username: 'jane', email: 'jane@example.com' },
  ];

  @Query(() => [User])
  users() {
    return this.userList;
  }
}
