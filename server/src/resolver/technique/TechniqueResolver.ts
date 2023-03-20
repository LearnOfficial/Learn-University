import { GraphQLError } from "graphql";
import { Arg, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import { CurrentUser } from "../../context.js";
import Learner from "../../entity/Learner.js";
import Technique from "../../entity/Technique.js";
import { TechniqueInput, TechniqueUpdateInput } from "./TechniqueInput.js";

@Resolver()
export class TechniqueResolver {

  // Create technique by current learner
  @Mutation(() => Technique, { nullable: true })
  async createTechnique(
    @Arg("createInput") createInput: TechniqueInput,
    @CurrentUser() currentUser: number
  ) {

    const learner = new Learner();
    learner.id = currentUser;

    let technique: Technique | null = new Technique(createInput);
    technique.learner = learner;

    await technique.createTechnique();
    return await technique.readTechnique();
  }

  // Updates a technique by id
  @Mutation(() => Technique || null)
  async updateTechnique(@Arg("updateInput") updateInput: TechniqueUpdateInput) {
    const current = new Technique(updateInput);
    let technique = await current.readTechnique();

    if (!technique) {
      throw new GraphQLError("The Technique does not exist.");
    }

    await current.updateTechnique();
    return current;
  }

  // Delete a technique by id
  @Mutation(() => String)
  async deleteTechnique(@Arg("id") id: number) {
    let technique: Technique | null = new Technique();
    technique.id = id;
    technique = await technique.readTechnique();
    if (!technique) {
      throw new GraphQLError("The Technique does not exist.");
    }
    await technique.deleteTechnique();
    return `Technique ${technique.title} was deleted`;
  }
}
