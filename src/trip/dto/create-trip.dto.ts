// src/trip/dto/create-trip.dto.ts
export class CreateTripDto {
  title: string;
  name: string;
  pax: string;
  fromDate: string;
  toDate: string;
  days: string;
  inclusions: string;
  exclusions: string;
  approximateCost: string;
  costs: { entity: string; details: string }[];
  itinerary: { number: string; details: string }[];
}
