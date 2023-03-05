import { GraphQLError } from "graphql";
import { Arg, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import Learner from "../../entity/Learner.js";
import Technique from "../../entity/Technique.js";
import { TechniqueInput, TechniqueUpdateInput } from "./TechniqueInput.js";

@Resolver(() => Learner)
export class TechniqueResolver {

    //TODO: Documentation
    //NOTE: Get techniques from the current user
    @FieldResolver(() => Technique, { nullable: true })
    async technique(@Root() learner: Learner) {
        let technique = new Technique();
        technique.learner = learner;
        return await technique.readTechnique();
    }

    // Given Technique data, CREATES and returns Technique object
    @Mutation(() => Technique, { nullable: true })
    async createTechnique(@Arg("createInput") createInput: TechniqueInput) {
        let technique: Technique | null = new Technique(createInput);
        await technique.createTechnique();
        return await technique.readTechnique();
    }

    // Given Technique data and ID, UPDATES and returns Technique object
    @Mutation(() => Technique||null)
    async updateTechnique(@Arg("updateInput") updateInput: TechniqueUpdateInput){
        const ACTUAL = new Technique(updateInput)
        const OLD = new Technique();
        OLD.id = updateInput.id;

        if(!await OLD.readTechnique()){
            throw new GraphQLError("The Technique does not exist."); 
        }else{
            await ACTUAL.updateTechnique();
            return ACTUAL.readTechnique();   
        }
    }

    // Given an ID, DELETE an Technique
    @Mutation(()=> String)
    async deleteTechnique(@Arg("id")id:number){
        let technique: Technique | null = new Technique();
        technique.id = id
        const TEMP = await technique.readTechnique();
        if(!TEMP){
            throw new GraphQLError("The Technique does not exist."); 
        }else{
            await technique.deleteTechnique();
            return `Technique ${TEMP.title} was deleted`;
        }
    }
}
