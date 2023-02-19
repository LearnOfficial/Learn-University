import { Field, ObjectType } from "type-graphql";
import { ILearnToken } from "../../@types/resolver/learner/ILearnerToken";

@ObjectType()
export class LearnerToken implements ILearnToken{
  @Field()
  token: String
};
