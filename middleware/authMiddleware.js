import jwt from "jsonwebtoken";
import dev from "../config/config.js";

// Middleware to verify JWT token
export const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ status: "error", message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, dev?.secret); 
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ status: "error", message: "Invalid token." });
  }
};
