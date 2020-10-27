export class CreateUpdateEducatorDto {
    readonly name: string;
    readonly password: string;
    readonly email: string;
    readonly username: string;
    readonly gender: string;
    readonly age: Number;
    readonly phone_number: string;
    readonly is_educator: boolean;
    readonly is_verified: boolean;
    readonly educator_rating: number;
}