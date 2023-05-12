import { Field, ID, InputType } from "type-graphql";
import { ILearningFile } from "../../@types/entity/ILearningFile";

@InputType()
class LearningFileInput implements ILearningFile{
    @Field()
    format: string;
    @Field()
    fileName: string;
    @Field({nullable: true})
    externalLink?: string;
    @Field({nullable: true})
    eventId?: number;
    @Field({nullable: true})
    activityId?: number;
}

@InputType()
class LearningFileUpdateInput implements ILearningFile{
    @Field()
    id: number;
    @Field()
    format: string;
    @Field()
    fileName: string;
    @Field({nullable: true})
    externalLink: string;
}

export{
    LearningFileInput,
    LearningFileUpdateInput
}
