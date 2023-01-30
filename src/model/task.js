import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
      trim: true,
      maxLength: [40, "title can not greater than 40 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxLength: [200, "title can not greater than 200 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
mongoose.models = {};
export default mongoose.models.Task || mongoose.model("Task", taskSchema);
