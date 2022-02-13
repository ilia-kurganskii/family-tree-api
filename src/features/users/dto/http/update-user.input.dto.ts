import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInputDto {
  @Field({ nullable: true })
  firstname?: string;
  @Field({ nullable: true })
  lastname?: string;
}
