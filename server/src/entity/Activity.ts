import { Field, ObjectType } from "type-graphql"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Repository } from "typeorm"
import type { IActivity } from "../@types/entity/IActivity";
import { AppDataSource } from "../data-source.js";
import type { Relation } from "typeorm";
import Event from "./Event.js";
import LearningFile from "./LearningFile.js";

@ObjectType("ActivityType")
@Entity({ name: "Activity" })
export default class Activity implements IActivity {
  private repository: Repository<Activity>;

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  startDate: Date;

  @Field()
  @Column()
  endDate: Date;

  @ManyToOne(() => Event, (event) => event.id)
  event: Relation<Event>

  @OneToMany(() => LearningFile, (learningFile) => learningFile.id)
  learningFiles: [LearningFile]

  constructor(params?: IActivity) {
    Object.assign(this, params);
    this.repository = AppDataSource.getRepository(Activity);
  }

  async createActivity(): Promise<void> {
    await this.repository.save(this);
  }

  async updateActivity(): Promise<void> {
    await this.createActivity();
  }

  async deleteActivity(): Promise<void> {
    console.log("deleting"); 
    await this.repository.delete({
      id: this.id
    })
  }


  async readOneActivity(): Promise<Activity | null>{ 
    return await this.repository.findOneBy({id: this.id});
  }

  async readActivity(): Promise<Activity[] | null> {
    return await this.repository.find({
      where: {
        event: {
          id: this.event.id
        }
      }
    });
  }

}
