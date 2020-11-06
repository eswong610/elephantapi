import { IsEmail, IsNotEmpty, MinLength, IsPhoneNumber, IsInt } from 'class-validator';
export class CreateUpdateStudentDto {
    readonly name: string;
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly username: string;
    @MinLength(4)
    @IsNotEmpty()
    readonly password : string;
    readonly gender: string;
    @IsInt()
    readonly age: string;
    @IsPhoneNumber("US")
    readonly phone_number: string;
    readonly student_name: string;
    @IsNotEmpty()
    readonly disability_name: string;
    @IsInt()
    readonly disability_spectrum: number;
    readonly student_interests: [];
    
    
    
}