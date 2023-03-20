import { GraphQLError } from "graphql";
import { Arg, Mutation, Resolver } from "type-graphql";
import Activity from "../../entity/Activity.js";
import { ActivityInput, ActivityUpdateInput } from "./ActivityInput.js";

@Resolver()
export class ActivityResolver {
    // Given Activity data, CREATES and returns Activity object
    @Mutation(() => Activity, { nullable: true })
    async createActivity(@Arg("createInput") createInput: ActivityInput) {
        let activity: Activity | null = new Activity(createInput);
        await activity.createActivity();
        return await activity.readActivity();
    }

    // Given Activity data and ID, UPDATES and returns Activity object
    @Mutation(() => Activity || null)
    async updateActivity(@Arg("updateInput") updateInput: ActivityUpdateInput) {
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
