import { InputType } from '@nestjs/graphql';

@InputType()
export class LogoutInputDto {
  readonly refreshToken: string;
}
