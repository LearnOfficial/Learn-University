import { Field, ID, InputType } from "type-graphql";
import { IActivity } from "../../@types/entity/IActivity";

@InputType()
class ActivityInput implements IActivity{
    @Field()
    title: string;
    @Field()
    startDate: Date;
    @Field()
    endDate: Date;
    @Field()
    eventId: number
}

@InputType()
class ActivityDeleteInput implements IActivity{
    @Field()
    id: number;
    @Field()
    eventId: number; 

    title: string;
    endDate: Date;
    startDate: Date;
}

export{
    ActivityInput,
    ActivityDeleteInput
}
