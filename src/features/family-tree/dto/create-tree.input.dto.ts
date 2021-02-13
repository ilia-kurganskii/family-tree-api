import { ApiProperty } from '@nestjs/swagger';

export class CreateTreeInputDto {
  @ApiProperty()
  name: string;
}
