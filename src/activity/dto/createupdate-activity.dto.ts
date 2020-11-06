export class CreateUpdateActivityDto {
     readonly name: string;
     readonly start_time: Date;
     readonly end_time: Date;
     readonly location: string;
     readonly price : number;
     readonly is_active: boolean;
     educatorID : string;
     readonly categoryID : string;
     is_booked : boolean;
     studentID : string;
}