import { AuthChecker } from "type-graphql";
import { ILearnServerContext } from "."; 
import {JWT_CONFIG} from "./deployment.js";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

export const authChecher: AuthChecker<ILearnServerContext>= ({context: {token}}) => {
  if(!token) throw new GraphQLError("User is not authenticated");

  //check if the token can be decrypted
  let flag = false;
  jwt.verify(token, JWT_CONFIG.secrect, (err, decoded) => {
    console.log(err);
    if(!err){
      flag = true; 
    }
  });
  return flag;
}
