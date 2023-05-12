import { NonEmptyArray } from "type-graphql";
import { ActivityResolver } from "./activity/ActivityResolver.js";
import { EventResolver } from "./event/EventResolver.js";
import { LearnerResolver } from "./learner/LearnerResolver.js";
import { LearningFileResolver } from "./learningFile/LearningFileResolver.js";
import { TechniqueResolver } from "./technique/TechniqueResolver.js";
import { LearnerFieldResolver } from "./learner/LearnerFieldResolver.js"
import { ActivityFieldResolver } from "./activity/ActivityFieldResolver.js";
import { EventFieldResolver } from "./event/EventFieldResolver.js";

const resolvers: NonEmptyArray<Function> = [
  LearnerResolver,
  ActivityResolver,
  TechniqueResolver,
  LearningFileResolver,
  EventResolver,
  LearnerFieldResolver,
  EventFieldResolver,
  ActivityFieldResolver,
]

export default resolvers;
