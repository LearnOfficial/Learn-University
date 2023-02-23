import { Arg, Authorized, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import Learner from "../../entity/Learner.js";
import { AppDataSource } from "../../data-source.js";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../../deployment.js";
import { ILearnTokenPayload } from "../../@types/resolver/learner/ILearnerToken.js";
import { LearnerToken } from "./LearnerToken.js";
import { LearnerSignUpInput } from "./LearnerInput.js";
import { CurrentUser, type ILearnServerContext } from "../../context.js";



@Resolver(Learner)
export class LearnerResolver {

  @Authorized()
  @Query(() => Learner, { nullable: true })
  async learner(
    @CurrentUser() userId: number
  ) {
    //find the user with the id
    let learner = new Learner();
    learner.id = userId;
    return await learner.readLearner();
  }

  @Mutation(() => LearnerToken)
  async createLearner(@Arg("learnerInput") learnerInput: LearnerSignUpInput): Promise<LearnerToken> {
    //find if there is someone with actually email
    const learner = new Learner(learnerInput);

    //check if the user is already in the Database
    let currentLearner = await learner.readLearner()

    if (!currentLearner) {
      learner.createLearner()
      currentLearner = await learner.readLearner();
    }

    //Generate the token
    const payload: ILearnTokenPayload = {
      userId: currentLearner?.id
    };

    console.log(payload);

    const token: LearnerToken = {
      token: jwt.sign(payload, JWT_CONFIG.secret)
    }

    return token;
  }

  @Authorized()
  @Mutation(() => Learner)
  async updateLearner(@Arg("learnerInput") learnerInput: LearnerSignUpInput): Promise<Learner> {
    const learner = new Learner();
    return learner;
  }
}

