import { Controller, Get, Param } from '@nestjs/common';
import { Booking }  from './interfaces/booking.interface'
import { BookingService } from './booking.service'
@Controller('booking')
export class BookingController {

    constructor(private readonly bookingService: BookingService) {}

    @Get('student/:id')
    async getBookingByStudent(@Param() param): Promise<Booking[]>{
        return this.bookingService.findByCaretaker(param.id);
    }
}
