import { GraphQLError } from "graphql";
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import Event from "../../entity/Event.js"
import { EventInput, EventUpdateInput } from "./EventInput.js";
import { CurrentUser } from "../../context.js";
import Learner from "../../entity/Learner.js";

@Resolver(() => Learner)
export class EventResolver {
 
  // Retrieve event with the actual learner
  @FieldResolver(() => [Event], { nullable: true })
  async events(
    @Root() learner: Learner
  ) {
    let event = new Event();
    console.log(learner.id);
    event.learner = learner;
    return await event.readEvent();
  }

  // Creates Event with the current user
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

  // Updates an Event with the current user and by id
  @Mutation(() => Event || null)
  async updateEvent(
    @Arg("updateInput") updateInput: EventUpdateInput,
    @CurrentUser() currentUser: number
  ) {
    const learner = new Learner();
    learner.id = currentUser;

    const current = new Event(updateInput)
    current.learner = learner;

    let event = await current.readEvent();

    if (!event) {
      throw new GraphQLError("The Event does not exist.");
    } else {
      await current.updateEvent();
    } 
  
    return await current.readEvent();
  }

  // Delete an Event by id
  @Mutation(() => String)
  async deleteEvent(@Arg("id") id: number) {
    let event = new Event();
    event.id = id;
    return await event.deleteEvent();
  }

}
