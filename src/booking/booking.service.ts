import { Injectable } from '@nestjs/common';
import { Booking } from './interfaces/booking.interface'
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class BookingService {
    constructor(@InjectModel('Activity') private readonly bookingModel: Model<Booking>) {}
    async findAll() : Promise<Booking[]> {
        return this.bookingModel.find();
    }
    async findByCaretaker(id: string) : Promise<Booking[]> {
        return this.bookingModel.find({caretakerID : id });
    }
}
