import { createParamDecorator } from "type-graphql";

export interface ILearnServerContext {
  userId: number
};

async function LearnContext(): Promise<ILearnServerContext>{
  return {
    userId: 1
  };
}  

//Typegraphql param decorator
function CurrentUser(){
  return createParamDecorator<ILearnServerContext>(({context}) => context.userId);
}

export { 
  LearnContext,
  CurrentUser
};
