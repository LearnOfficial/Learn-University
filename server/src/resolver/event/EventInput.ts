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
    @Field()
    techniqueId: number;
}

@InputType()
class EventUpdateInput implements IEvent {
    @Field()
    id: number;

    @Field({nullable: true})
    title: string;

    @Field({nullable: true})
    description: string;

    @Field({nullable: true})
    startDate: Date;

    @Field({nullable: true})
    endDate: Date;

    @Field({nullable: true})
    type: EventTypeEnum;

    @Field({nullable: true})
    techniqueId: number;
}


export {
    EventInput,
    EventUpdateInput
}
