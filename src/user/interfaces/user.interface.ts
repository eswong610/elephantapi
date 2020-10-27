export interface User {
    id? : string,
    name: string,
    email: string,
    gender: string,
    age: number,
    phone_number: string,
    image_url: string,
    is_educator: true,
    is_verified: boolean,
    educator_rating: number,
    disability_name: string,
    caretaker_name: string,
}