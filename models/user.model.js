import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photoUrl: {
    type: String,
    required: false,
  },
  accessLevel: {
    type: String,
    required: true,
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const Users = mongoose.model("users", userSchema);
