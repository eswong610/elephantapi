export class CreateRatingDto {
    readonly educatorID: string;
    readonly studentID: string;
    readonly activityID: string;
    readonly rating: number;
}