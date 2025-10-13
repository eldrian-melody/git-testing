export const resolvers = {
  Query: {
    task: () => {
      return {
        title: "Sample Task",
        description: "This is a sample task description.",
        completed: false,
      };
    },
  },
};
