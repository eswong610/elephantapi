export class CreateCategoryDto {
    readonly name: string;
    children: [];
    readonly description: string;
    readonly is_active: boolean;
}