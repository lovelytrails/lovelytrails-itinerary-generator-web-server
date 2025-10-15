import { InputType, Field } from '@nestjs/graphql';
import { CostItemInput } from './cost-item.input';
import { ItineraryItemInput } from './itinerary-item.input';

@InputType()
export class CreateTripInput {
  @Field()
  title: string;

  @Field()
  name: string;

  @Field()
  pax: string;

  @Field()
  fromDate: string;

  @Field()
  toDate: string;

  @Field()
  days: string;

  @Field()
  inclusions: string;

  @Field()
  exclusions: string;

  @Field()
  approximateCost: string;

  @Field(() => [CostItemInput])
  costs: CostItemInput[];

  @Field(() => [ItineraryItemInput])
  itinerary: ItineraryItemInput[];
}
