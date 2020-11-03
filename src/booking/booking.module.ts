import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { BookingSchema } from './schemas/booking.schema';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
    imports: [MongooseModule.forFeature([{name: "Booking", schema: BookingSchema}])],
    controllers: [BookingController],
    providers: [BookingService]
})
export class BookingModule {}
