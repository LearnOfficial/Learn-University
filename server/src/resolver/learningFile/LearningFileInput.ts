import { Field, ID, InputType } from "type-graphql";
import { ILearningFile } from "../../@types/entity/ILearningFile";

@InputType()
class LearningFileInput implements ILearningFile{
    @Field()
    format: string;
    @Field()
    fileName: string;
}

@InputType()
class LearningFileUpdateInput implements ILearningFile{
    @Field()
    id: number;
    @Field()
    format: string;
    @Field()
    fileName: string;
}

export{
    LearningFileInput,
    LearningFileUpdateInput
}