import { GraphQLError } from "graphql";
import { Arg, Mutation, ObjectType, Resolver } from "type-graphql";
import LearningFile from "../../entity/LearningFile.js";
import Event from "../../entity/Event.js";
import { LearningFileInput, LearningFileUpdateInput } from "./LearningFileInput.js";
import Activity from "../../entity/Activity.js";

@Resolver()
export class LearningFileResolver {

  // Given LearningFile data, CREATES and returns LearningFile object
  @Mutation(() => LearningFile, { nullable: true })
  async createLearningFile(@Arg("createLearningFile") createInput: LearningFileInput) {
    let event;
    let activity;

    let learningFile: LearningFile | null = new LearningFile(createInput);

    if (createInput.eventId) {
      event = new Event;
      event.id = createInput.eventId;
      learningFile.event = event;
    } 

    if (createInput.activityId) {
      activity = new Activity;
      activity.id = createInput?.activityId;
      learningFile.activity = activity;
    }

    await learningFile.createLearningFile();
    return await learningFile.readLearningFileById();
  }

  // Given LearningFile data and ID, UPDATES and returns LearningFile object
  @Mutation(() => LearningFile || null)
  async updateLearningFile(@Arg("updateLearningFile") updateInput: LearningFileUpdateInput) {
    const ACTUAL = new LearningFile(updateInput)
    const OLD = new LearningFile();
    OLD.id = updateInput.id;

    if (!await OLD.readLearningFile()) {
      throw new GraphQLError("The Learning File does not exist.");
    } else {
      await ACTUAL.updateLearningFile();
      return ACTUAL.readLearningFile();
    }
  }


  // Given an ID, DELETE a LearningFile
  @Mutation(() => String)
  async deleteLearningFile(@Arg("id") id: number) {
    let learningFile: LearningFile | null = new LearningFile();
    learningFile.id = id
    const TEMP = await learningFile.readLearningFile();
    if (!TEMP) {
      throw new GraphQLError("The Learning File does not exist.");
    } else {
      await learningFile.deleteLearningFile();
    }
  }

}
