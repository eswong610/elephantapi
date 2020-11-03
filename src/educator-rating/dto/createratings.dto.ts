export class CreateRatingDto {
    readonly educatorID: string;
    readonly caretakerID: string;
    readonly activityID: string;
    readonly rating: number;
}