import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly id: string;
  @IsString()
  readonly password: string;
}
