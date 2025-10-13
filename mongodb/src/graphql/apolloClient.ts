import { ApolloServer } from "@apollo/server";
import type { ApolloServer as ApolloServerType } from "@apollo/server";
import { resolvers } from "./resolvers";
import { readFile } from "node:fs/promises";
import { expressMiddleware } from "@as-integrations/express5";
import { RequestHandler } from "express";
import mergedSchema from "./merged.schema";
import mergedResolvers from "./merged.resolvers";

interface ApolloServerSetup {
  apolloServer: ApolloServerType;
  apolloMiddleware: RequestHandler;
}

export const createApolloServer = async (): Promise<ApolloServerSetup> => {
  const typeDefs = await readFile("./src/graphql/task.graphql", "utf8");

  const apolloServer = new ApolloServer({
    typeDefs: mergedSchema,
    resolvers: mergedResolvers,
  });

  await apolloServer.start();

  const apolloMiddleware = expressMiddleware(apolloServer);

  return { apolloServer, apolloMiddleware };
};
