import { Users } from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error?.message);
  }
};

export const addUser = async (req, res) => {
  try {
    const userInfo = req.body;
    console.log(userInfo);
    const newUser = new Users(userInfo);
    const result = await newUser.save();
    console.log("result--------->", result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error?.message);
  }
};
