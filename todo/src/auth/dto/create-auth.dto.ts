import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class CreateAuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    senha: string;
}
