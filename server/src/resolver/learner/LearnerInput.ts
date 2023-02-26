import { Field, InputType} from "type-graphql";
import { ILearner } from "../../@types/entity/ILearner";

@InputType()
class LearnerSignUpInput implements ILearner{
  @Field()
  fullname: string
  @Field()
  username: string
  @Field()
  email:string
  @Field()
  password: string

} 

@InputType()
class LearnerLogInInput implements ILearner{
  fullname: string
  @Field({nullable: true})
  username: string
  @Field({nullable: true})
  email: string
  @Field()
  password: string

}

export {
  LearnerSignUpInput,
  LearnerLogInInput
}
