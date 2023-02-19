import { Field, InputType} from "type-graphql";
import { ILearner } from "../../@types/entity/ILearner";

@InputType()
class LearnerSignUpInput implements ILearner{
  @Field()
  name: string
  @Field()
  username: string
  @Field()
  email:string
  @Field()
  password: string

} 

export {
  LearnerSignUpInput
}
