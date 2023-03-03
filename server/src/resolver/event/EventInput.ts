import { Field, ID, InputType } from "type-graphql";
import { EventTypeEnum, IEvent } from "../../@types/entity/IEvent.js";

@InputType()
class EventInput implements IEvent {
    @Field()
    title: string;
    @Field({nullable: true})
    description: string;
    @Field()
    startDate: Date;
    @Field()
    endDate: Date;
    @Field()
    type: EventTypeEnum;
}

@InputType()
class EventUpdateInput implements IEvent {
    @Field()
    id: number;
    @Field()
    title: string;
    @Field({nullable: true})
    description: string;
    @Field()
    startDate: Date;
    @Field()
    endDate: Date;
    @Field()
    type: EventTypeEnum;
}


export {
    EventInput,
    EventUpdateInput
}