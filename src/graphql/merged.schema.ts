import path from "path";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const schemas = loadFilesSync(path.join(__dirname, "../**/*.graphql"));

const mergedSchema = mergeTypeDefs(schemas);

export default mergedSchema;
