import { authenticateUser } from "../middleware/authMiddleware.js";
import { Users } from "../models/user.model.js";

export const getUsers = [
  authenticateUser,
  async (req, res) => {
    try {
      const users = await Users.find();
      res.status(200).json({
        status: "success",
        message: "User fetch successfully",
        users: users,
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  }
];

export const addUser = async (req, res) => {
  try {
    const userInfo = req.body;
    console.log(userInfo);
    const newUser = new Users(userInfo);
    const result = await newUser.save();

    res.status(200).json({
      status: "success",
      status_code: 200,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      status_code: 500,
      message: error?.message || "Internal Server Error",
      error: error,
    });
  }
};
