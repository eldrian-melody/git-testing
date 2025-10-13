import { ApolloServer } from "@apollo/server";
import type { ApolloServer as ApolloServerType } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { RequestHandler } from "express";
import mergedSchema from "./merged.schema";
import mergedResolvers from "./merged.resolvers";

interface ApolloServerSetup {
  apolloServer: ApolloServerType;
  apolloMiddleware: RequestHandler;
}

export const createApolloServer = async (): Promise<ApolloServerSetup> => {
  const apolloServer = new ApolloServer({
    typeDefs: mergedSchema,
    resolvers: mergedResolvers,
  });

  await apolloServer.start();

  const apolloMiddleware = expressMiddleware(apolloServer);

  return { apolloServer, apolloMiddleware };
};
