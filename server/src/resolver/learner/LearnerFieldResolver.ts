import { FieldResolver, Resolver, Root } from "type-graphql";
import Event from "../../entity/Event.js";
import Learner from "../../entity/Learner.js";
import Technique from "../../entity/Technique.js";

@Resolver(() => Learner)
export class LearnerFieldResolver {
  // Read events by current learner
  @FieldResolver(() => [Event], { nullable: true })
  async events(
    @Root() learner: Learner
  ) {
    let event = new Event();
    console.log(learner.id);
    event.learner = learner;
    return await event.readEvent();
  }

  // Read techniques by current learner
  @FieldResolver(() => Technique, { nullable: true })
  async technique(@Root() learner: Learner) {
    let technique = new Technique();
    technique.learner = learner;
    return await technique.readTechnique();
  }


}
