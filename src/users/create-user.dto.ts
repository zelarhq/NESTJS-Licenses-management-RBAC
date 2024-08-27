import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  roles?: number[];
}
