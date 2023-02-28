import { ApolloServer } from "@apollo/server"; 
import { startStandaloneServer } from "@apollo/server/standalone";
import "reflect-metadata"; 
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source.js";
import { LearnerResolver } from "./resolver/LearnerResolver.js";

//Initialize typeorm
await AppDataSource.initialize(); 

//Generate Type-Graphql schema  to Apollo Server


const schema = await buildSchema({
  resolvers: [LearnerResolver]
})


const server = new ApolloServer({
  schema: schema
});

const {url} = await startStandaloneServer(server, {
  listen: {port: 8080}
});

console.log(`Server ready at ${url}`)




