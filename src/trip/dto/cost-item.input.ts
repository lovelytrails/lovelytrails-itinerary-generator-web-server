// src/trip/dto/cost-item.input.ts
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CostItemInput {
  @Field()
  entity: string;

  @Field()
  details: string;
}
