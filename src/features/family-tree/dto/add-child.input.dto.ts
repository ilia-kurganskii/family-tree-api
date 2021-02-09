import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddChildInputDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  childId: string;
}
