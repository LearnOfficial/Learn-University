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

export{
    ActivityInput
}
