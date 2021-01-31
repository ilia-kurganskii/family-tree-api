import { User } from '@features/users/models/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@features/users/models/role.model';

export class UserDto extends User {
  @ApiProperty({
    example: 'email@gmail.com',
  })
  email: string;

  @ApiProperty()
  firstname?: string;

  @ApiProperty()
  lastname?: string;

  @ApiProperty({
    enum: Role,
  })
  role: Role;
}
