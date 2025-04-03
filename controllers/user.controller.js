import { authenticateUser } from "../middleware/authMiddleware.js";
import bcrypt from 'bcrypt';
import { Users } from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const getUsers = [
  // authenticateUser,
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

    if (!userInfo.password) {
      return res.status(400).json({ status: "error", message: "Password is required" });
    }

    // Create user (password will be hashed automatically in the model)
    const newUser = new Users(userInfo);
    const result = await newUser.save();

    res.status(200).json({
      status: "success",
      message: "User created successfully",
      data: {
        name: result.name,
        email: result.email,
        photoUrl: result.photoUrl,
        accessLevel: result.accessLevel,
        createdAt: result.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error?.message || "Internal Server Error" });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Validate Input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2️⃣ Find User by Email
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3️⃣ Check Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4️⃣ Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, accessLevel: user.accessLevel },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5️⃣ Respond with User Data & Token
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        accessLevel: user.accessLevel,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};