import { GraphQLError } from "graphql";
import {
  MutationAddTaskArgs,
  MutationDeleteTaskArgs,
  MutationUpdateTaskArgs,
  QueryTaskArgs,
  Resolvers,
} from "../generated/graphql";
import { Task } from "./task.model";
import mongoose from "mongoose";
import { errorHandler } from "../graphql/errorHandler";

const taskResolvers: Resolvers = {
  Query: {
    tasks: async () => Task.find(),
    task: async (_, args: QueryTaskArgs) => {
      try {
        const task = await Task.findById(args.id);
        if (!task) {
          throw new Error("Task with this id is not found");
        }
        return task;
      } catch (error) {
        throw new Error(`Failed to find task : ${error}`);
      }
    },
  },

  Mutation: {
    updateTask: async (_, { input }: MutationUpdateTaskArgs) => {
      try {
        if (!input) {
          throw new GraphQLError("Input is undefined", {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }
        const { id, title, description, completed } = input;

        if (!id) {
          throw new GraphQLError("Task ID is required", {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }

        const updatedTask = await Task.findByIdAndUpdate(
          id,
          {
            ...(title !== undefined && { title }),
            ...(description !== undefined && { description }),
            ...(completed !== undefined && { completed }),
          },
          { new: true }
        );

        if (!updatedTask) {
          throw new GraphQLError("Task with this id is not found to update", {
            extensions: { code: "NOT_FOUND" },
          });
        }

        return updatedTask;
      } catch (error) {
        throw errorHandler(error, "updateTask");
      }
    },
    deleteTask: async (_, args: MutationDeleteTaskArgs) => {
      try {
        const deletedTask = await Task.findByIdAndDelete(args.id);
        if (!deletedTask) {
          throw new Error(
            "[deleteTask mutation] Task with this id is not found"
          );
        }

        return deletedTask;
      } catch (error) {
        throw new Error("[deleteTask mutation] failed to delete task");
      }
    },
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
    addTask: async (_, { input }: MutationAddTaskArgs) => {
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
