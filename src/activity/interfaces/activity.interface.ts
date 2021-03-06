export interface Activity {
    id? : string,
    name: string,
    start_time: Date,
    end_time: Date,
    educatorID: string,
    categoryID: string
    is_booked: boolean,
    studnetID : string
}