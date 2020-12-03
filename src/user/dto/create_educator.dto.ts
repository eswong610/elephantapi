import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber, IsInt } from 'class-validator';

export class CreateUpdateEducatorDto {
    @IsNotEmpty()
    readonly name: string;

    @MinLength(4)
    @IsNotEmpty()
    password: string;

    @IsEmail()
    readonly email: string;

   
    @MaxLength(20)
    readonly username: string;
    readonly gender: string;
    @MaxLength(200)
    readonly description: string;
    @IsInt()
    readonly age: Number;
    
    readonly phone_number: string;
    readonly is_educator: boolean;
    readonly is_verified: boolean;
    readonly educator_rating: number;
    interests: [];
}