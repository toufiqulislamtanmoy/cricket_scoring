import { authenticateUser } from "../middleware/authMiddleware.js";
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
