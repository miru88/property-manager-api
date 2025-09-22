import { IsEmail, IsNumber } from 'class-validator';

export class GetUserDto {

    @IsNumber()
    id: number;

    @IsEmail()
    email: string;


}