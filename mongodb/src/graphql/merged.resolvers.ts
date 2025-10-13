import path from "path";
import { mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const resolvers = loadFilesSync(path.join(__dirname, "../**/*.resolvers.*"));
const mergedResolvers = mergeResolvers(resolvers);

export default mergedResolvers;
