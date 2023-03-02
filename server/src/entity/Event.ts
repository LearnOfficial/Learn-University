import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import type { EventTypeEnum, IEvent } from "../@types/entity/IEvent";
import { AppDataSource } from "../data-source.js";

@ObjectType("EventType")
@Entity({name: "Event"})
export default class Event implements IEvent{
  private repository: Repository<Event>;
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

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

  async readEvent(): Promise<Event | null> { 
    return await this.repository.findOneBy({id: this.id});
  }

}
