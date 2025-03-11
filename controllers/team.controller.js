import { Team } from "../models/teams.model.js";
import { Tournament } from "../models/tournament.model.js";

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json({
      status: "success",
      message: "Teams fetched successfully",
      teams: teams,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching teams",
      error: error.message,
    });
  }
};

export const registerTeams = async (req, res) => {
  try {
    const { multiple, teams } = req.body;

    if (multiple && Array.isArray(teams)) {
      // ✅ Handle multiple teams
      if (teams.length === 0) {
        return res.status(400).json({
          status: "error",
          message: "Team list is empty",
        });
      }

      // Validate all teams first before inserting
      const teamsToCreate = [];

      for (const teamData of teams) {
        const { teamName, tournamentCode } = teamData;

        if (!teamName || !tournamentCode) {
          return res.status(400).json({
            status: "error",
            message: "Required fields missing (teamName, tournamentCode) for one or more teams",
          });
        }

        // Verify tournament exists
        const tournament = await Tournament.findOne({ tournamentCode });
        if (!tournament) {
          return res.status(404).json({
            status: "error",
            message: `Tournament not found with code: ${tournamentCode}`,
          });
        }

        // Push the new team data with tournamentId (using _id from tournament)
        teamsToCreate.push({
          teamName,
          tournamentId: tournament._id,
        });
      }

      // Bulk insert teams
      const createdTeams = await Team.insertMany(teamsToCreate);

      return res.status(201).json({
        status: "success",
        message: "Teams registered successfully!",
        teams: createdTeams,
      });
    } else {
      // ✅ Handle single team
      const { teamName, tournamentCode } = teams; // teams is an object in this case

      if (!teamName || !tournamentCode) {
        return res.status(400).json({
          status: "error",
          message: "Required fields missing (teamName, tournamentCode)",
        });
      }

      // Verify tournament exists
      const tournament = await Tournament.findOne({ tournamentCode });
      if (!tournament) {
        return res.status(404).json({
          status: "error",
          message: "Tournament not found with the provided code",
        });
      }

      // Create and save a single team
      const team = new Team({
        teamName,
        tournamentId: tournament._id, // Corrected to use tournament._id
      });

      await team.save();

      return res.status(201).json({
        status: "success",
        message: "Team registered successfully!",
        team,
      });
    }
  } catch (error) {
    console.error("Error registering team:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Internal server error",
    });
  }
};

