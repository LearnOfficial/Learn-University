import { Arg, Authorized, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import Learner from "../../entity/Learner.js";
import { AppDataSource } from "../../data-source.js";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../../deployment.js";
import { ILearnTokenPayload } from "../../@types/resolver/learner/ILearnerToken.js";
import { LearnerToken } from "./LearnerToken.js";
import { LearnerSignUpInput } from "./LearnerInput.js";



@Resolver(Learner)
export class LearnerResolver{

  @Authorized()
  @Query(() => [Learner], {nullable: true})
  async student(@Arg("name") name: string) {
    const repository = AppDataSource.getRepository(Learner);
    const student = repository.createQueryBuilder("Learner")
    .where("Learner.name like :name", {name:`%${name}%`})
    .getMany();
    return student;
  }

  @Mutation(() => LearnerToken)
  async signup(@Arg("learnerInput") learnerInput: LearnerSignUpInput): Promise<LearnerToken>{
    //find if there is someone with actually email
    const learner = new Learner(learnerInput);

    //check if the user is already in the Database
    const currentLearner = await learner.read()

    if(currentLearner){
      throw new GraphQLError("User already in Learn");
    }else{
      learner.create()
    }
 

    //Generate the token
    const payload: ILearnTokenPayload = {
      userId: learner.id
    };

    const token: LearnerToken =  {
      token: jwt.sign(payload, JWT_CONFIG.secrect)
    }

    return token;
  }
}

