// src/trip/trip.controller.ts
import { Body, Controller, Post, Get, Res } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { Response } from 'express';
import * as fs from 'fs';
import { join } from 'path';

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

  @Post('download')
  downloadDummyPdf(@Res() res: Response) {
    const filePath = join(process.cwd(), 'src', 'assets', 'sample.pdf');
    res.download(filePath, 'itinerary.pdf');
  }

  @Post('stream')
  async streamDummyPdf(@Body() tripData: CreateTripDto, @Res() res: Response) {
    // Simulate 10-second delay
    await new Promise(resolve => setTimeout(resolve, 20000));

    const filePath = join(process.cwd(), 'src', 'assets', 'sample.pdf');
    const pdfBuffer = fs.readFileSync(filePath);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="itinerary.pdf"',
    });
    res.send(pdfBuffer);
  }
}
