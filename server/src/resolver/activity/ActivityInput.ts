import { Field, ID, InputType } from "type-graphql";
import { IActivity } from "../../@types/entity/IActivity";

@InputType()
class ActivityInput implements IActivity{
    @Field()
    title: string;
    @Field()
    startTime: Date;
    @Field()
    endTime: Date;
    @Field()
    eventId: number
}

@InputType()
class ActivityUpdateInput implements IActivity{
    @Field()
    id: number;
    @Field()
    title: string;
    @Field()
    startTime: Date;
    @Field()
    endTime: Date;
}

export{
    ActivityInput,
    ActivityUpdateInput
}