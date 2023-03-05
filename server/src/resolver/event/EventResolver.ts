import { GraphQLError } from "graphql";
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import Event from "../../entity/Event.js"
import { EventInput, EventUpdateInput } from "./EventInput.js";
import { CurrentUser } from "../../context.js";
import Learner from "../../entity/Learner.js";

@Resolver(() => Learner)
export class EventResolver {

    // Given an id, returns the Event object
    @FieldResolver(() => [Event], { nullable: true })
    async events(
        @Root() learner: Learner
    ) { 
        let event = new Event();
        console.log(learner.id);
        event.learner = learner; 
        return await event.readEvent();
    }

    // Given Event data, CREATES and returns Event object
    @Mutation(() => Event, { nullable: true })
    async createEvent(
        @Arg("createInput") createInput: EventInput,
        @CurrentUser() currentUser: number
    ) {
        let learner = new Learner();
        learner.id = currentUser;
        
        let event: Event | null = new Event(createInput);
        event.learner = learner;
        await event.createEvent(); 

        return event;
    }

    // Given Event data and ID, UPDATES and returns Event object
    @Mutation(() => Event || null)
    async updateEvent(@Arg("updateInput") updateInput: EventUpdateInput) {
        const ACTUAL = new Event(updateInput)
        const OLD = new Event();
        OLD.id = updateInput.id;

        if (!await OLD.readEvent()) {
            throw new GraphQLError("The Event does not exist.");
        } else {
            await ACTUAL.updateEvent();
            return ACTUAL.readEvent();
        }
    }

    // Given an ID, DELETE an Event
    @Mutation(() => String)
    async deleteEvent(@Arg("id") id: number) {
        /*let event: Event | null = new Event();
        event.id = id
        const TEMP = await event.readEvent();
        if (!TEMP) {
            throw new GraphQLError("The Event does not exist.");
        } else {
            await event.deleteEvent();
            return `Event ${TEMP.title} was deleted`;
        } */
    }

}
