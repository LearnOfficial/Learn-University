import { GraphQLError } from "graphql";
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import Event from "../../entity/Event.js"
import { EventInput, EventUpdateInput } from "./EventInput.js";
import { CurrentUser } from "../../context.js";
import Learner from "../../entity/Learner.js";

@Resolver(() => Learner)
export class EventResolver {

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

  // Creates Event by current learner
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

  // Updates an Event by id
  @Mutation(() => Event || null)
  async updateEvent(
    @Arg("updateInput") updateInput: EventUpdateInput
  ) {
    const current = new Event(updateInput)
    let event = await current.readEvent();

    if (!event) {
      throw new GraphQLError("The Event does not exist.");
    }

    await current.updateEvent();
    return await current.readEvent();
  }

  // Delete an Event by id
  @Mutation(() => String)
  async deleteEvent(@Arg("id") id: number) {
    let event: Event | null = new Event();
    event.id = id;
    event = await event.readEvent() as Event;

    if (!event) {
      throw new GraphQLError("The Event does not exist.");
    }

    return await event.deleteEvent();
  }

}
