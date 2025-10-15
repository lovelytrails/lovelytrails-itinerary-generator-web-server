import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TripService } from './trip.service';
import { CreateTripInput } from './dto/create-trip.dto';
import { Trip } from './schemas/trip.schema';

@Resolver(() => Trip)
export class TripResolver {
  constructor(private readonly tripService: TripService) {}

  @Mutation(() => String)
  async generatePdf(@Args('input') input: CreateTripInput): Promise<string> {
    const buffer = await this.tripService.generatePdf(input);
    return buffer.toString('base64'); // or return a success message
  }

  @Mutation(() => String)
  async getPdfFromDb(@Args('input') input: CreateTripInput): Promise<string> {
    const buffer = await this.tripService.getPdfFromDb(input);
    return buffer.toString('base64'); // or return a success message
  }

  @Mutation(() => Trip)
  async createTrip(@Args('input') input: CreateTripInput): Promise<Trip> {
    return this.tripService.create(input);
  }

  @Query(() => [Trip])
  async findAllTrips(): Promise<Trip[]> {
    return this.tripService.findAll();
  }


  @Mutation(() => String)
  async createTripAndFetchPdf(@Args('input') input: CreateTripInput): Promise<string> {
    // Step 1: Save trip details
    await this.tripService.create(input);

    // Step 2: Simulate GCP response with hardcoded PDF ID
    const simulatedPdfId = '68ece33038454e867a292683'; // Replace with actual ObjectId later

    // Step 3: Fetch PDF binary from MongoDB
    const buffer = await this.tripService.getPdfById(simulatedPdfId);

    // Step 4: Return base64 to client
    return buffer.toString('base64');
  }

}
