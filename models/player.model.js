import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, min: 10, max: 60 }, // Optional validation for age
  photoUrl: { type: String, default: "" }, // Added player photo URL
  totalRuns: { type: Number, default: 0 },
  totalMatches: { type: Number, default: 0 },
  strikeRate: { type: Number, default: 0 },
  average: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['active', 'suspended', 'banned'], // Enum for status values
    default: 'active', // Default status is active
  },
});

export default mongoose.model("Player", PlayerSchema);
