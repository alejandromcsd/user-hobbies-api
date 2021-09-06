import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHobbyDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}

export class UpdateHobbyDto extends OmitType(CreateHobbyDto, [
  'userId',
] as const) {}
