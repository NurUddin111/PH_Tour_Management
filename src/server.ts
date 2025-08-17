import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {

    await mongoose.connect(envVars.DB_URL);

    console.log("Connected to DB");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server listening to post ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// SIGTERM Signal.
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received...Server shutting down!!!");
  if (server) {
    server.close();
    process.exit(1);
  }
  process.exit(1);
});

// Unhandled rejection error.
process.on("SIGINT", () => {
  console.log("SIGINT signal received...Server shutting down!!!");
  if (server) {
    server.close();
    process.exit(1);
  }
  process.exit(1);
});
// Unhandled rejection error.
process.on("unhandledRejection", () => {
  console.log("Unhandled rejection detected...Server shutting down!!!");
  if (server) {
    server.close();
    process.exit(1);
  }
  process.exit(1);
});

// Uncaught rejection error.
process.on("uncaughtException", () => {
  console.log("Uncaught exception detected...Server shutting down!!!");
  if (server) {
    server.close();
    process.exit(1);
  }
  process.exit(1);
});
