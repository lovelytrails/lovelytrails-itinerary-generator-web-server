// src/trip/dto/itinerary-item.input.ts
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class ItineraryItemInput {
  @Field()
  number: string;

  @Field()
  details: string;
}
