import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

export interface IPost extends Document {
  title: string;
  summary: string;
  content: string;
  cover?: string;
  author: IUser["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post ||
  mongoose.model<IPost>("Post", PostSchema);
