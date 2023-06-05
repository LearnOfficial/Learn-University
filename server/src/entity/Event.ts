import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Repository } from "typeorm";
import type { Relation } from "typeorm";
import type { EventTypeEnum, IEvent } from "../@types/entity/IEvent";
import { AppDataSource } from "../data-source.js";
import Activity from "./Activity.js";
import Learner from "./Learner.js";
import Technique from "./Technique.js";
import LearningFile from "./LearningFile.js";

@ObjectType("EventType")
@Entity({name: "Event"})
export default class Event implements IEvent{
  private repository: Repository<Event>;
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({
    length: 100
  })
  title: string;

  @Field()
  @Column() 
  description: string; 

  @Field()
  @Column({type: "datetime"})
  startDate: Date;

  @Field()
  @Column({type: "datetime"})
  endDate: Date;

  @Field()
  @Column()
  type: EventTypeEnum;

  @ManyToOne(() => Learner, (learner) => learner.id)
  learner: Relation<Learner>

  // TODO: remove in cascade
  @OneToMany(() => Activity, (activity) => activity.id, {cascade: true})
  activities: [Activity]

  @ManyToOne(() => Technique, (technique) => technique.id)
  technique: Technique 

  @OneToMany(() => LearningFile, (learningFile) => learningFile.id)
  learningFiles: [Relation<LearningFile>]

  constructor(params?: IEvent){
    Object.assign(this, params);
    this.repository = AppDataSource.getRepository(Event);
  }

  async createEvent(): Promise<void>{
    await this.repository.save(this);
  }

  async updateEvent(): Promise<void>{
    await this.createEvent();
  }

  async deleteEvent(): Promise<void>{
    await this.repository.delete({
      id: this.id
    })
  } 

  async readOneEventById(): Promise<Event | null>{
    return await this.repository.findOneBy({id: this.id});
  }

  async readEvent(): Promise<Array<Event> | Event | null> { 
    if(this.id){
      return await this.repository.findOneBy({
        id: this.id
      })
    }
    return await this.repository.find({
      where:{
        learner : {
          id : this.learner.id
        },
      }
    });
  }

}
