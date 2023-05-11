import { GraphQLError } from "graphql";
import { Arg, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import Activity from "../../entity/Activity.js";
import Learner from "../../entity/Learner.js";
import { ActivityInput, ActivityUpdateInput } from "./ActivityInput.js";
import Event from "../../entity/Event.js";

@Resolver(() => Event)
export class ActivityResolver {
    //TODO: Documentaton
    //NOTE: Getting the activities from the Learner
    @FieldResolver(() => Activity, { nullable: true })
    async activity(@Root() event: Event) {
        let activity = new Activity();
        activity.event = event;
        return await activity.readActivity();
    }

    // Given Activity data, CREATES and returns Activity object
    @Mutation(() => Activity, { nullable: true })
    async createActivity(@Arg("createActivity") createInput: ActivityInput) {
        let activity: Activity | null = new Activity(createInput);
        await activity.createActivity();
        return await activity.readActivity();
    }

    // Given Activity data and ID, UPDATES and returns Activity object
    @Mutation(() => Activity || null)
    async updateActivity(@Arg("updateActivity") updateInput: ActivityUpdateInput) {
        const ACTUAL = new Activity(updateInput)
        const OLD = new Activity();
        OLD.id = updateInput.id;

        if (!await OLD.readActivity()) {
            throw new GraphQLError("The activity does not exist.");
        } else {
            await ACTUAL.updateActivity();
            return ACTUAL.readActivity();
        }
    }

    // Given an ID, DELETE an Activity
    @Mutation(() => String)
    async deleteActivity(@Arg("id") id: number) {
        let activity: Activity | null = new Activity();
        activity.id = id
        const TEMP = await activity.readActivity();
        if (!TEMP) {
            throw new GraphQLError("The activity does not exist.");
        } else {
            await activity.deleteActivity();
            return `Activity ${TEMP.title} was deleted`;
        }
    }

}
