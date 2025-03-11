import mongoose from "mongoose";

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
    default: function() {
      // Generate a random 6 character alphanumeric code
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for(let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    }
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
