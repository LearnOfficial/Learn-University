import { Field, InterfaceType } from "type-graphql";
import { IUser } from "../../@types/interface/IUser";

@InterfaceType()
export class User implements IUser{
  @Field()
  email: String;
  @Field()
  name: String;
  @Field()
  username: String;
  @Field()
  profileImg?: String | undefined;
}
