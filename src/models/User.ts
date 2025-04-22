import mongoose, { Document, Schema } from "mongoose";
import { hash, compare } from "bcryptjs";

export interface IUser extends Document {
  username: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    minlength: 4,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return compare(candidatePassword, this.password);
};

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = 10;
    this.password = await hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error as Error);
  }
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
