import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  const url = process.env.MONGODB_URL;
  if (!url) {
    throw new Error("MONGODB_URL is not defined");
  }
  try {
    await connect(url);
  } catch (error) {
    throw new Error(`Error connecting to database: ${error}`);
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    throw new Error(`Error disconnecting from database: ${error}`);
  }
}

export { connectToDatabase, disconnectFromDatabase };
