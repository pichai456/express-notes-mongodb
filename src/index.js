import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { router as NotesRouter } from "./modules/notes/notes.controller";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/apis", NotesRouter);

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connect to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB");
  }
}
app.listen(PORT, async () => {
  await connectMongoDB();
  console.log("Server is running on port 3000");
});
