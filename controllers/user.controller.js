import { authenticateUser } from "../middleware/authMiddleware.js";
import bcrypt from 'bcrypt';
import { Users } from "../models/user.model.js";

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

    // Check if the password is provided
    if (!userInfo.password) {
      return res.status(400).json({
        status: 'error',
        status_code: 400,
        message: 'Password is required',
      });
    }

    // Hash the password using bcrypt (saltRounds = 10)
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);

    // Replace the plain password with the hashed password in userInfo
    userInfo.password = hashedPassword;

    // Create a new user document with the hashed password
    const newUser = new Users(userInfo);

    // Save the new user to the database
    const result = await newUser.save();

    // Respond with success
    res.status(200).json({
      status: 'success',
      status_code: 200,
      message: 'User created successfully',
      data: {
        name: result.name,
        email: result.email,
        photoUrl: result.photoUrl,
        accessLevel: result.accessLevel,
        createdAt: result.createdAt,
      },
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      status: 'error',
      status_code: 500,
      message: error?.message || 'Internal Server Error',
      error: error,
    });
  }
};


export const login = async (req, res) => {

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await Users.findOne({ email });

    // If user doesn't exist, return error
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare passwords (assuming hashed passwords in your database)
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.comparePassword(password);

    if (isPasswordValid) {
      // Return user data (avoid sending password in the response)
      res.json({
        user: {
          id: user._id,
          email: user.email,
          name: user.name, // Include any other user details you want
        },
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
