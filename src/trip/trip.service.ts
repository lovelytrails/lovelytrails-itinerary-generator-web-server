import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTripInput } from './dto/create-trip.dto';
import * as fs from 'fs';
import { join } from 'path';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TripService {
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
}
