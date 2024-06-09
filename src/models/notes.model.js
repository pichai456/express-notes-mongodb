import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    tags: {
      type: Array,
    },
    subscribeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const NoteModel = mongoose.model("note", noteSchema);
export default NoteModel;
