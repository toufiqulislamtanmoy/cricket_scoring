import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    trim: true,
  },
  teamId: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return uuidv4().replace(/-/g, "").toUpperCase().slice(0, 6); 
    },
  },
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Team = mongoose.model("Team", teamSchema);

export { Team };
