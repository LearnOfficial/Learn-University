import { FieldResolver, Resolver, Root } from "type-graphql";
import Activity from "../../entity/Activity.js";
import Event from "../../entity/Event.js";
import LearningFile from "../../entity/LearningFile.js";

@Resolver(() => Event)
export class EventFieldResolver {
    @FieldResolver(() => [Activity], { nullable: true })
    async activity(@Root() event: Event) {
        let activity = new Activity();
        activity.event = event;
        return await activity.readActivity();
    }

    @FieldResolver(() => [LearningFile] , { nullable: true })
    async learningFile(@Root() event: Event) {
        let learningFile = new LearningFile();
        learningFile.event = event;
        return await learningFile.readLearningFile();
    }

}
