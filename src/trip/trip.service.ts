import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTripInput } from './dto/create-trip.dto';
import * as fs from 'fs';
import { join } from 'path';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { InjectModel } from '@nestjs/mongoose';
import { Trip, TripDocument } from './schemas/trip.schema';
import { Model } from 'mongoose';
import { PdfService } from '../itineraries/itineraries.service';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(Trip.name) private tripModel: Model<TripDocument>,
    private readonly pdfService: PdfService
  ) {}

  async create(input: CreateTripInput): Promise<Trip> {
    const createdTrip = new this.tripModel(input);
    return createdTrip.save();
  }

  async findAll(): Promise<Trip[]> {
    return this.tripModel.find().exec();
  }

  async generatePdf(input: CreateTripInput): Promise<Buffer> {
    // 🔍 Manual validation
    const instance = plainToInstance(CreateTripInput, input);
    const errors = await validate(instance);

    if (errors.length > 0) {
      const flattenErrors = (validationErrors: ValidationError[]): string[] => {
        const messages: string[] = [];

        for (const error of validationErrors) {
          if (error.constraints) {
            messages.push(...Object.values(error.constraints as Record<string, string>));
          }

          if (error.children && error.children.length > 0) {
            messages.push(...flattenErrors(error.children));
          }
        }

        return messages;
      };

      const messages = flattenErrors(errors).join('; ');
      throw new BadRequestException(`Validation failed: ${messages}`);
    }

    // 🧾 Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 10000));
    const filePath = join(process.cwd(), 'src', 'assets', 'sample.pdf');
    const pdfBuffer = fs.readFileSync(filePath);

    // 📦 Return base64 string
    return pdfBuffer;
  }

  async getPdfFromDb(input: CreateTripInput): Promise<Buffer> {
    // 🔍 Manual validation
    const instance = plainToInstance(CreateTripInput, input);
    const errors = await validate(instance);

    if (errors.length > 0) {
      const flattenErrors = (validationErrors: ValidationError[]): string[] => {
        const messages: string[] = [];

        for (const error of validationErrors) {
          if (error.constraints) {
            messages.push(...Object.values(error.constraints as Record<string, string>));
          }

          if (error.children && error.children.length > 0) {
            messages.push(...flattenErrors(error.children));
          }
        }

        return messages;
      };

      const messages = flattenErrors(errors).join('; ');
      throw new BadRequestException(`Validation failed: ${messages}`);
    }

    // 🧾 Extract existing pdf
    const hardcodedId = '68caad8fc268d9f4036ad360'; // replace with actual ObjectId
    const pdfBuffer = await this.pdfService.getPdfBufferById(hardcodedId);
    console.log(`Fetched PDF for ID: ${hardcodedId}, size: ${pdfBuffer.length} bytes`);

    // 📦 Return base64 string
    return pdfBuffer;
  }

  async getPdfById(id: string): Promise<Buffer> {
    return this.pdfService.getPdfBufferById(id);
  }
}
