export class CreateUpdateEducatorDto {
    readonly name: string;
    password: string;
    readonly email: string;
    readonly username: string;
    readonly gender: string;
    readonly description: string;
    readonly age: Number;
    readonly phone_number: string;
    readonly is_educator: boolean;
    readonly is_verified: boolean;
    readonly educator_rating: number;
}