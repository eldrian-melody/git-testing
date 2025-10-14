import { Resolvers } from "../generated/graphql";
import { Task } from "./task.model";
import { Types } from "mongoose";

const taskResolvers: Resolvers = {
  Query: {
    tasks: async () => Task.find(),
  },

  Mutation: {
    deleteTasks: async () => {
      try {
        const tasksToDelete = await Task.find();
        if (!tasksToDelete.length) {
          throw new Error("No tasks found to delete");
        }

        await Task.deleteMany();
        return tasksToDelete;
      } catch (error) {
        throw new Error("Failed to delete tasks");
      }
    },
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
