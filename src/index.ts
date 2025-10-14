import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connection";
import cors from "cors";
import { createApolloServer } from "./graphql/apolloClient";

dotenv.config();

const PORT = process.env.PORT || 7000;

const app = express();

app.use(cors(), express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

connectDB();

const startServer = async () => {
  const { apolloMiddleware } = await createApolloServer();
  app.use("/graphql", apolloMiddleware);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
