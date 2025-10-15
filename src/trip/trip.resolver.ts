import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TripService } from './trip.service';
import { CreateTripInput } from './dto/create-trip.dto';

@Resolver()
export class TripResolver {
  constructor(private readonly tripService: TripService) {}

  @Mutation(() => String)
  async generatePdf(@Args('input') input: CreateTripInput): Promise<string> {
    const buffer = await this.tripService.generatePdf(input);
    return buffer.toString('base64'); // or return a success message
  }

}
