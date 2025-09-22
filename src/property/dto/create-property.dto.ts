import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class CreatePropertyDto {

    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsNumber()
    userId: number;

}