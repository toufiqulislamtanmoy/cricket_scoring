import Player from "../models/player.model.js";

// ✅ Add New Player
export const addPlayer = async (req, res) => {
  try {
    const { name, age, photoUrl, totalRuns, totalMatches, strikeRate, average } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Player name is required" });
    }

    const newPlayer = new Player({ name, age, photoUrl, totalRuns, totalMatches, strikeRate, average });

    const savedPlayer = await newPlayer.save();
    res.status(201).json({ message: "Player added successfully", player: savedPlayer });
  } catch (error) {
    res.status(500).json({ message: "Error adding player", error: error.message });
  }
};

// ✅ Update Player
export const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedPlayer = await Player.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json({ message: "Player updated successfully", player: updatedPlayer });
  } catch (error) {
    res.status(500).json({ message: "Error updating player", error: error.message });
  }
};

// ✅ Suspend Player (Change status to 'suspended')
export const suspendPlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const suspendedPlayer = await Player.findByIdAndUpdate(id, { status: 'suspended' }, { new: true });

    if (!suspendedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json({ message: "Player suspended successfully", player: suspendedPlayer });
  } catch (error) {
    res.status(500).json({ message: "Error suspending player", error: error.message });
  }
};

// ✅ Ban Player (Change status to 'banned')
export const banPlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const bannedPlayer = await Player.findByIdAndUpdate(id, { status: 'banned' }, { new: true });

    if (!bannedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json({ message: "Player banned successfully", player: bannedPlayer });
  } catch (error) {
    res.status(500).json({ message: "Error banning player", error: error.message });
  }
};

// ✅ Get All Players (Filter Out Suspended/Banned Players)
export const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find({ status: { $ne: 'suspended' }, $ne: 'banned' }); // Fetch only active players
    res.status(200).json({ message: "Players fetched successfully", players });
  } catch (error) {
    res.status(500).json({ message: "Error fetching players", error: error.message });
  }
};

// ✅ Get Single Player by ID (Ensure the player is not suspended or banned)
export const getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findOne({ _id: id, status: { $ne: 'suspended', $ne: 'banned' } }); // Fetch only active player

    if (!player) {
      return res.status(404).json({ message: "Player not found or suspended/banned" });
    }

    res.status(200).json({ message: "Player fetched successfully", player });
  } catch (error) {
    res.status(500).json({ message: "Error fetching player", error: error.message });
  }
};
