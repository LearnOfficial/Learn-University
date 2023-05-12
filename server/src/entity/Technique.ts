import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Repository } from "typeorm";
import type { Relation } from "typeorm";
import type { ITechnique } from "../@types/entity/ITechnique";
import { AppDataSource } from "../data-source.js";
import Learner from "./Learner.js";

@ObjectType("TechniqueType")
@Entity({ name: "Technique" })
export default class Technique implements ITechnique {
  private repository: Repository<Technique>;

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  focusTime: number;

  @Field()
  @Column()
  breakTime: number;

  @Field()
  @Column()
  interval: number;

  @ManyToOne(() => Learner, (learner) => learner.id)
  learner: Relation<Learner>

  constructor(params?: ITechnique) {
    Object.assign(this, params);
    this.repository = AppDataSource.getRepository(Technique);
  }

  async createTechnique(): Promise<void> {
    await this.repository.save(this);
  }

  async updateTechnique(): Promise<void> {
    await this.createTechnique();
  }

  async deleteTechnique(): Promise<void> {
    await this.repository.delete({
      id: this.id
    })
  }

  async readTechnique(): Promise<Technique | null> {
    return await this.repository.findOneBy({ id: this.id });
  }
}
