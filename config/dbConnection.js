import mongoose from "mongoose";
import dev from "../config/config.js";

const mongoURI = dev.db.mongoURI;

export const dbConnection = () => {
  mongoose
    .connect(mongoURI, {
      dbName: "cricket",
    })
    .then(() => {
      console.log("Connected Successfully");
    })
    .catch((error) => {
      console.error("Connection Failed", error);
    });
};
