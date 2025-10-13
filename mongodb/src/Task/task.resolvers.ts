import { Resolvers } from "../generated/graphql";
import { Task } from "./task.model";

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

  // Mutation: {
  //   // Add a new task
  //   addTask: async (_, { input }) => {
  //     try {
  //       if (!input) {
  //         throw new Error("Input is undefined");
  //       }

  //       const newTask = new Task({
  //         title: input.title,
  //         description: input.description ?? "",
  //         completed: input.completed,
  //       });

  //       await newTask.save();
  //       return newTask;
  //     } catch (error) {
  //       console.error("Error adding task:", error);
  //       throw new Error("Failed to add task");
  //     }
  //   },
  // },

  Mutation: {
    addTask: async (_, { input }) => {
      try {
        if (!input) {
          throw new Error("Input is undefined");
        }
        const newTask = new Task({
          title: input.title,
          description: input.description ?? null,
          completed: input.completed,
        });

        await newTask.save();
        return newTask;
      } catch (error) {
        console.error("Error adding task:", error);
        throw new Error("Failed to add task");
      }
    },
  },
};

export default taskResolvers;
