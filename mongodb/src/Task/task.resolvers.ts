import { Resolvers } from "../generated/graphql";

const taskResolvers: Resolvers = {
  Query: {
    tasks: () => [
      {
        title: "Sample Task",
        description: "This is a sample task description",
        completed: false,
      },
    ],
  },
};

export default taskResolvers;
