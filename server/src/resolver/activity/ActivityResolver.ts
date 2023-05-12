import { GraphQLError } from "graphql";
import { Arg, Mutation, Resolver } from "type-graphql";
import Activity from "../../entity/Activity.js";
import Event from "../../entity/Event.js";
import { ActivityInput } from "./ActivityInput.js";

@Resolver()
export class ActivityResolver {

    // Given Activity data, CREATES and returns Activity object
    @Mutation(() => [Activity], { nullable: true })
    async createActivity(@Arg("createActivity") createInput: ActivityInput) {
        const event = new Event;
        event.id = createInput.eventId;
        let activity: Activity | null = new Activity(createInput);
        activity.event = event;
        await activity.createActivity();
        return await activity.readActivity();
    }

    // Given Activity data and ID, UPDATES and returns Activity object
    @Mutation(() => Activity || null)
    async updateActivity(@Arg("updateActivity") updateInput: ActivityInput) {
        const current = new Activity(updateInput)
        let activity = await current.readActivity();

        if (!activity) {
            throw new GraphQLError("The Activity does not exist.");
        }

        await current.updateActivity();
        return await current.readActivity();
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
        }
    }

}
