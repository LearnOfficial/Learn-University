import { StandaloneServerContextFunctionArgument } from "@apollo/server/dist/esm/standalone";
import { createParamDecorator } from "type-graphql"; 
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "./deployment.js";

export interface ILearnServerContext {
  userId?: number,
  iat?: number,
};

async function LearnContext({ req }: StandaloneServerContextFunctionArgument): Promise<ILearnServerContext> {
  const token = req?.headers?.authorization as string;
  if(!token){
    return {};
  } 

  let payload: ILearnServerContext = {};

  jwt.verify(token, JWT_CONFIG.secret, (err, decoded) => {
    payload = decoded as {};
  });

  return payload;
}

//Typegraphql param decorator
function CurrentUser() {
  return createParamDecorator<ILearnServerContext>(({ context }) => context.userId);
}

export {
  LearnContext,
  CurrentUser
};
