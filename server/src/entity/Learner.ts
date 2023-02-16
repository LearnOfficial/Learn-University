import { createHash, createHmac } from "crypto";
import { Field, ID, ObjectType } from "type-graphql";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@ObjectType()
@Entity({name: "Learner"})
export class Learner{
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field({nullable: true})
  @Column({
    length: 50
  })
  name: string

  @Field()
  @Column({
    length: 40
  })
  username: string 

  @Field()
  @Column()
  password: string 


  @BeforeInsert()
  @BeforeUpdate()
  async(){
    if(this.password){
      this.password = createHmac('sha256', this.password).digest('hex')
    }
  }

}

export default Learner;
