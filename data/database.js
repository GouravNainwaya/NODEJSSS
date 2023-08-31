import mongoose from "mongoose";

export const connectDB = () => {
    mongoose
    ?.connect(process.env.MONGO_URI, {
      dbName: "backendapi",
    })
    .then((e) => {
      console.log(`conectcted database with ${e.connection.host} `);
    })
    .catch((e) => {
      console.log("databse connected error", e);
    });  
};