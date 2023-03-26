import { FieldResolver, Resolver, Root } from "type-graphql"
import Activity from "../../entity/Activity.js";
import LearningFile from "../../entity/LearningFile.js";

@Resolver(() => Activity)
export class ActivityFieldResolver {
    @FieldResolver(() => [LearningFile], { nullable: true })
    async learningFile(@Root() activity: Activity) {
        let learningFile = new LearningFile();
        learningFile.activity = activity;
        return await learningFile.readLearningFile();
    }
}
