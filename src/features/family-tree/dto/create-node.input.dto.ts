import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNodeInputDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  firstname: string;

  @ApiProperty()
  lastname?: string;

  @ApiProperty()
  description: string;
}
