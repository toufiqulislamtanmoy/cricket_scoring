import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  tournamentCode: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return uuidv4().replace(/-/g, "").toUpperCase().slice(0, 6); 
    },
  },

  tournamentType: {
    type: String,
    enum: ["knockout", "group", "pointTable"],
    required: true,
  },
  createdBy: {
    type: String, 
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Tournament = mongoose.model("Tournament", tournamentSchema);

export { Tournament };
