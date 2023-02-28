import { createHmac } from "crypto";
import { Field, ID, ObjectType } from "type-graphql";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import type { ILearner } from "../@types/entity/ILearner.js";
import { AppDataSource } from "../data-source.js";
import { JWT_CONFIG } from "../deployment.js";


@ObjectType("LearnerType")
@Entity({ name: "Learner" })
class Learner implements ILearner {
  private repository: Repository<Learner>;

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: number

  @Field()
  @Column()
  fullname: string

  @Field()
  @Column({
    length: 40
  })
  username: string

  @Field()
  @Column()
  email: string

  @Column()
  password: string

  @Field()
  @Column({default: "Not implemented yet"})
  profileImg?: String

  @BeforeInsert()
  @BeforeUpdate()
  setPassword() {
    if (this.password) {
      this.password = createHmac('sha256', JWT_CONFIG.secret).update(this.password).digest('hex')
    }
  }

  constructor(params?: ILearner) {
    Object.assign(this, params);
    this.repository = AppDataSource.getRepository(Learner);
  }

  async createLearner(): Promise<void>{
    await this.repository.save(this);
  }

  async updateLearner(): Promise<void>{
    await this.createLearner();
  }

  async deleteLearner(): Promise<void>{
    await this.repository.delete({
      id: this.id
    })
  }

  async readLearner(): Promise<Learner | null> { 
    if(this.id){
      return await this.repository.findOneBy({id: this.id});
    } 

    let learner = await this.repository.findOneBy({username: this.username})
    if(!learner){
      learner = await this.repository.findOneBy({email: this.email});
    }
    
    return learner;
  }
}

export default Learner;
