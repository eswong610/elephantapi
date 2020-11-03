import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Booking }  from './interfaces/booking.interface'
import { BookingService } from './booking.service'
import { CreateBookingDto } from './dto/createbooking.dto';
@Controller('booking')
export class BookingController {

    constructor(private readonly bookingService: BookingService) {}

    @Get('student/:id')
    async getBookingByStudent(@Param() param): Promise<Booking[]>{
        return this.bookingService.findByCaretaker(param.id);
    }

    @Post("create")
    async create(@Body() createBookingDto: CreateBookingDto) : Promise<Booking>{
        return this.bookingService.create(createBookingDto);
    }
}
