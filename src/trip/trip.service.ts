import { Injectable } from '@nestjs/common';
import { CreateTripInput } from './dto/create-trip.dto';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class TripService {
  async generatePdf(input: CreateTripInput): Promise<Buffer> {
    await new Promise(resolve => setTimeout(resolve, 10000)); // Simulate delay

    const filePath = join(process.cwd(), 'src', 'assets', 'sample.pdf');
    const pdfBuffer = fs.readFileSync(filePath);

    return pdfBuffer; // or convert to base64 if needed
  }
}
