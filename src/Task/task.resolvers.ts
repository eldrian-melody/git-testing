import { Resolvers } from "../generated/graphql";
import { Task } from "./task.model";
import { Types } from "mongoose";

const taskResolvers: Resolvers = {
  Query: {
    tasks: async () => {
      const tasks = await Task.find();
      return tasks.map((task) => ({
        id: (task._id as Types.ObjectId).toString(),
        title: task.title,
        description: task.description,
        completed: task.completed,
      }));
    },
  },

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

        return {
          id: (newTask._id as Types.ObjectId).toString(),
          title: newTask.title,
          description: newTask.description,
          completed: newTask.completed,
        };
      } catch (error) {
        console.error("Error adding task:", error);
        throw new Error("Failed to add task");
      }
    },
  },
};

export default taskResolvers;
