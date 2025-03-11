import { Tournament } from "../models/tournament.model.js";

export const getAllTournament = async (req,res)=>{
    try {
        const tournaments = await Tournament.find();
        res.status(200).json({
          status: "success",
          message: "Tournament fetch successfully",
          tournaments: tournaments,
        });
      } catch (error) {
        res.status(500).send(error?.message);
      }
    
}


export const registerTournament = async (req, res) => {
  try {
    const { name, tournamentType,createdBy } = req.body;

    // Validate required fields
    if (!name|| !tournamentType || !createdBy) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required (name, tournamentType)',
      });
    }

    // Create a new tournament instance
    const tournament = new Tournament({
      name,
      tournamentType,
      createdBy
    });

    // Save the tournament to the database
    await tournament.save();

    // Send a success response
    res.status(201).json({
      status: 'success',
      message: 'Tournament registered successfully!',
      tournament,
    });
  } catch (error) {
    console.error('Error registering tournament:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    });
  }
};
