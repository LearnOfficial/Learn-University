import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { authChecher } from "./auth-checker.js";
import { ILearnServerContext, LearnContext } from "./context.js";
import { AppDataSource } from "./data-source.js";
import resolvers from "./resolver/index.js";


//Initialize typeorm
await AppDataSource.initialize();

//Generate Type-Graphql schema  to Apollo Server

const schema = await buildSchema({
  resolvers: resolvers,
  authChecker: authChecher,
  authMode: "null",
  validate: {forbidUnknownValues: false}
})


const server = new ApolloServer<ILearnServerContext>({
  schema: schema,
});

const { url } = await startStandaloneServer(server, {
  context: LearnContext,
  listen: { port: 8080 },
});

console.log(`Server ready at ${url}`)



