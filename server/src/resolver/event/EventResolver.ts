import { GraphQLError } from "graphql";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Event from "../../entity/Event.js"
import { EventInput, EventUpdateInput } from "./EventInput.js";

@Resolver(Event)
export class EventResolver {

    // Given an id, returns the Event object
    @Query(() => Event, { nullable: true })
    async event(@Arg("id") id: number) {
        let event = new Event();
        event.id = id;
        return await event.readEvent();
    }

    // Given Event data, CREATES and returns Event object
    @Mutation(() => Event, { nullable: true })
    async createEvent(@Arg("createInput") createInput: EventInput) {
        let event: Event | null = new Event(createInput);
        await event.createEvent();
        return await event.readEvent();
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
        let event: Event | null = new Event();
        event.id = id
        const TEMP = await event.readEvent();
        if (!TEMP) {
            throw new GraphQLError("The Event does not exist.");
        } else {
            await event.deleteEvent();
            return `Event ${TEMP.title} was deleted`;
        }
    }

}