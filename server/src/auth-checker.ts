import { GraphQLError } from "graphql";
import { AuthChecker } from "type-graphql"; 
import { ILearnServerContext } from "./context.js";

export const authChecher: AuthChecker<ILearnServerContext>= ({context}) => {
  if(Object.keys(context).length === 0){
    throw new GraphQLError("You must provide token authorization!");
  }

  return true;
}
