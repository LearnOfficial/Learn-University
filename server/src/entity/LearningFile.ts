import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Repository } from "typeorm";
import type { ILearningFile } from "../@types/entity/ILearningFile";
import Event from "./Event.js";
import type { Relation } from "typeorm";
import { AppDataSource } from "../data-source.js";
import Activity from "./Activity.js";

@ObjectType("LearningFileType")
@Entity({ name: "LearningFile" })
export default class LearningFile implements ILearningFile {
  private repository: Repository<LearningFile>;

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  fileName: string

  @Field()
  @Column({ length: 10 })
  format: string

  @ManyToOne(() => Event, (event) => event.id)
  event: Relation<Event>

  @ManyToOne(() => Activity, (activity) => activity.id)
  activity: Relation<Activity>

  constructor(params?: ILearningFile) {
    Object.assign(this, params);
    this.repository = AppDataSource.getRepository(LearningFile);
  }

  async createLearningFile(): Promise<void> {
    await this.repository.save(this);
  }

  async updateLearningFile(): Promise<void> {
    await this.createLearningFile();
  }

  async deleteLearningFile(): Promise<void> {
    await this.repository.delete({
      id: this.id
    })
  }

  async readLearningFile(): Promise<LearningFile | null> {
    return await this.repository.findOneBy({ id: this.id });
  }

}
