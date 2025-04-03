import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    photoUrl: {
      type: String,
      default: "", // Optional, no need for `required: false`
    },
    accessLevel: {
      type: String,
      enum: ["user", "admin"], // Restrict to specific roles
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const Users = mongoose.model("User", userSchema);
