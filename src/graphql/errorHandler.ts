import { GraphQLError } from "graphql";
import mongoose from "mongoose";

export const errorHandler = (error: unknown, location: string): never => {
  console.error(`[${location} error]:`, error);

  // 1️⃣ Handle GraphQL errors that were thrown intentionally
  if (error instanceof GraphQLError) {
    throw new GraphQLError(error.message, {
      extensions: {
        code: error.extensions?.code ?? "GRAPHQL_ERROR",
        location,
      },
    });
  }

  // 2️⃣ Handle invalid MongoDB ObjectId (e.g. wrong format)
  if (error instanceof mongoose.Error.CastError) {
    throw new GraphQLError("Invalid ID format", {
      extensions: { code: "BAD_USER_INPUT", location },
    });
  }

  // 3️⃣ Handle validation or schema errors
  if (error instanceof mongoose.Error.ValidationError) {
    throw new GraphQLError("Validation failed", {
      extensions: { code: "BAD_USER_INPUT", location },
    });
  }

  // 4️⃣ Fallback for all other unexpected errors
  throw new GraphQLError("Internal server error", {
    extensions: { code: "INTERNAL_SERVER_ERROR", location },
  });
};
