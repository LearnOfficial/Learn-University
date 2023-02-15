import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AppDataSource } from "../data-source.js";
import Learner from "../entity/Learner.js";

@Resolver(Learner)
export class LearnerResolver{

  @Query(() => [Learner])
  async student(@Arg("name") name: string) {
    const repository = AppDataSource.getRepository(Learner);
    const student = repository.createQueryBuilder("Learner")
    .where("Learner.name like :name", {name:`%${name}%`})
    .getMany();
    return student;
  }
}

