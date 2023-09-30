import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// ! to use the class validator, the interface will need to be changed into a class - shouldn't really make a difference
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
