import { NonEmptyArray } from "type-graphql";
import { LearnerResolver } from "./learner/LearnerResolver.js";


const resolvers: NonEmptyArray<Function> = [
  LearnerResolver,
]

export default resolvers;
