import { AuthChecker } from "type-graphql"; 
import { ILearnServerContext } from "./context.js";

export const authChecher: AuthChecker<ILearnServerContext>= ({context: {userId}}) => {
  return true;
}
