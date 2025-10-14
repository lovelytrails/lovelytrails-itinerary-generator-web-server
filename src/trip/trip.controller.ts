// src/trip/trip.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';

@Controller('trip')
export class TripController {
  @Post()
  create(@Body() tripData: CreateTripDto) {
    console.log('Received trip data:', tripData);
    return {
      message: 'Trip data received successfully',
      received: tripData,
    };
  }
}
