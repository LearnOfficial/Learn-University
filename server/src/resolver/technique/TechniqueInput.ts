import { Field, ID, InputType } from "type-graphql";
import { ITechnique } from "../../@types/entity/ITechnique";

@InputType()
class TechniqueInput implements ITechnique {
  @Field()
  title: string;
  @Field()
  focusTime: number;
  @Field()
  breakTime: number;
  @Field()
  interval: number;
}

@InputType()
class TechniqueUpdateInput implements ITechnique {
  @Field()
  id: number;
  @Field()
  title: string;
  @Field()
  focusTime: number;
  @Field()
  breakTime: number;
  @Field()
  interval: number;
}

export {
  TechniqueInput,
  TechniqueUpdateInput
}
