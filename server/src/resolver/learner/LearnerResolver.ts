import { Arg, Authorized, Field, FieldResolver, InputType, Mutation, Query, Resolver, Root } from "type-graphql";
import Learner from "../../entity/Learner.js";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../../deployment.js";
import { ILearnToken, ILearnTokenPayload } from "../../@types/resolver/learner/ILearnerToken.js";
import { LearnerToken } from "./LearnerToken.js";
import { LearnerLogInInput, LearnerSignUpInput, LearnerUpdateInput } from "./LearnerInput.js";
import { CurrentUser } from "../../context.js";
import { createHmac } from "crypto";



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

  @Mutation(() => LearnerToken, { nullable: true })
  async createLearner(@Arg("signupInput") signupInput: LearnerSignUpInput): Promise<LearnerToken | null> {
    //find if the email already exists
    let learner: Learner | null = new Learner(signupInput);

    //check if the user is already in the Database
    let currentLearner = await learner.readLearner()

    if (!currentLearner) {
      await learner.createLearner()
      currentLearner = await learner.readLearner();
    } else {
      throw new GraphQLError("The user is registered.");
    }

    //Generate the token
    const payload: ILearnTokenPayload = {
      userId: learner?.id
    };

    const token: LearnerToken = {
      token: jwt.sign(payload, JWT_CONFIG.secret)
    }

    return token;
  }

  @Mutation(() => LearnerToken)
  async readLearner(@Arg("loginInput") loginInput: LearnerLogInInput): Promise<ILearnToken> {

    if (!loginInput.username && !loginInput.email) {
      throw new GraphQLError("You must provide an username.");
    }

    let learner: Learner | null = new Learner();

    //[TODO]: The user must define email or username.
    learner.email = loginInput.email;
    learner.username = loginInput.username;
    learner = await learner.readLearner();

    if (!learner) {
      throw new GraphQLError("The user is not registered.");
    }

    const passwordHash = createHmac("SHA256", JWT_CONFIG.secret).update(loginInput.password).digest("hex");
    if (!(learner?.password == passwordHash)) {
      throw new GraphQLError("The password is incorrect.");
    }

    const payload: ILearnTokenPayload = {
      userId: learner?.id
    }

    return {
      token: jwt.sign(payload, JWT_CONFIG.secret)
    }
  }

  @Authorized()
  @Mutation(() => Learner)
  async updateLearner(
    @Arg("learnerInput") learnerInput: LearnerUpdateInput,
    @CurrentUser() currentUser: number
  ): Promise<Learner> {
    let learner: Learner = new Learner();
    learner.id = currentUser;
    learner = await learner.readLearner() as Learner;

    if (learnerInput.password) learner.password = learnerInput.password;
    if (learnerInput.fullname) learner.fullname = learnerInput.fullname;

    await learner?.updateLearner();
    return learner;
  }

  @Authorized()
  @Mutation(() => String)
  async deleteLearner(@CurrentUser() currentUser: number): Promise<String> {
    let learner: Learner | null = new Learner();
    learner.id = currentUser;
    learner = await learner.readLearner();
    await learner?.deleteLearner();
    return `User ${currentUser} deleted.`;
  }
}

