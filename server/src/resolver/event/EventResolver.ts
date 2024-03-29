import { GraphQLError } from "graphql";
import { Arg, Mutation, Resolver } from "type-graphql";
import Event from "../../entity/Event.js"
import { EventInput, EventUpdateInput } from "./EventInput.js";
import { CurrentUser } from "../../context.js";
import Learner from "../../entity/Learner.js";
import Technique from "../../entity/Technique.js";
import Activity from "../../entity/Activity.js";

@Resolver()
export class EventResolver {

  // Creates Event by current learner
  @Mutation(() => Event, { nullable: true })
  async createEvent(
    @Arg("createEvent") createInput: EventInput,
    @CurrentUser() currentUser: number
  ) {
    const technique = new Technique;
    let learner = new Learner();

    learner.id = currentUser;
    technique.id = createInput.techniqueId;

    let event: Event | null = new Event(createInput);

    // When create an event it can create multiples activities
    event.activities?.map((activity) => {
      activity.event = event!;
    });

    event.learner = learner;
    event.technique = technique;
    await event.createEvent();
    return event;
  }

  // Updates an Event by id
  @Mutation(() => Event || null)
  async updateEvent(
    @Arg("updateEvent") updateInput: EventUpdateInput
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
  @Mutation(() => Event)
  async deleteEvent(@Arg("id") id: number) {
    let event: Event | null = new Event();
    event.id = id;
    event = await event.readOneEventById();

    if (!event) {
      throw new GraphQLError("The Event does not exist.");
    }

    await event.deleteEvent();
    return event;
  }

}
